import { gql } from '@apollo/client';
import type { Provider } from '@ethersproject/providers';
import EthDater from 'ethereum-block-by-date';
import type { Contract } from 'ethers';
import { ethers } from 'ethers';
import type { Dispatch } from 'react';
import {
  useEffect,
  useMemo,
  createContext,
  useContext,
  useReducer,
} from 'react';
import BalanceABI from '@/abi/balance.json';
import CarrackABI from '@/abi/carrack.json';
import JourneyABI from '@/abi/journey.json';
import LootRealmsL1ABI from '@/abi/lootRealmsL1.json';
import { useWalletContext } from '@/hooks/useWalletContext';
import apolloClient from '@/util/apolloClient';

const CONTRACT_ADDRESSES = {
  mainnet: {
    REALMS: '0x7AFe30cB3E53dba6801aa0EA647A0EcEA7cBe18d',
    JOURNEY: '0x17963290db8c30552d0cfa2a6453ff20a28c31a2',
    CARRACK: '0xcdfe3d7ebfa793675426f150e928cd395469ca53',
    LORDS: '0x686f2404e77Ab0d9070a46cdfb0B7feCDD2318b0',
  },
  rinkeby: {
    REALMS: '0x6B13F1C319c2DdA7Ae15c04f540671B8A0E2AE9B',
    JOURNEY: '0x8ff4549Cb610755507732eA88b9413B625c55b7C',
    CARRACK: '0xcA20487BF988687D480dea76F1499cFbD0F97E81',
    LORDS: '0x6781dbb93C6BaC8b91bE1c6e3c99dFd98a7b5b88',
  },
};

type Version = 'v1' | 'v2';

interface JourneyState {
  totalRealms: number;
  totalRealmsStaked: number;
  lordsBalance: number;
  claimableLordsBalance: number;
  unclaimableLordsBalance: number;
  isApproved: boolean;
  epoch: number;
  nextEpochDate: Date | null;
  version: Version;
}

class JourneyActions {
  private account: string;
  private network: string;
  private dispatch: Dispatch<Partial<JourneyState>>;
  private journeyContract: Contract;
  private carrackContract: Contract;
  private realmsContract: Contract;
  private lordsContract: Contract;
  private state: JourneyState;
  private provider: Provider;
  private addresses: {
    REALMS: string;
    JOURNEY: string;
    CARRACK: string;
    LORDS: string;
  };

  constructor({ account, signer, provider, dispatch, state, network }) {
    this.account = account;
    this.dispatch = dispatch;
    this.state = state;
    this.provider = provider;
    this.network = network ? network : 'mainnet';
    this.addresses =
      CONTRACT_ADDRESSES[this.network] ?? CONTRACT_ADDRESSES.mainnet;

    this.realmsContract = new ethers.Contract(
      this.addresses.REALMS,
      LootRealmsL1ABI,
      signer
    );
    this.journeyContract = new ethers.Contract(
      this.addresses.JOURNEY,
      JourneyABI,
      provider
    );
    this.carrackContract = new ethers.Contract(
      this.addresses.CARRACK,
      CarrackABI,
      provider
    );
    this.lordsContract = new ethers.Contract(
      this.addresses.LORDS,
      BalanceABI,
      provider
    );
  }

  async setApprovalForAllRealms() {
    const journeyApproved = await this.isApprovalSetForAllRealms();
    if (journeyApproved) {
      this.dispatch({ isApproved: true });
      return true;
    }

    const approve = await this.realmsContract.setApprovalForAll(
      this.state.version === 'v2'
        ? this.addresses.CARRACK
        : this.addresses.JOURNEY,
      true
    );
    const receipt = await approve.wait();
    this.dispatch({ isApproved: !!receipt });
    return receipt;
  }

  async isApprovalSetForAllRealms() {
    const journeyApproved = await this.realmsContract.isApprovedForAll(
      this.account,
      this.state.version === 'v2'
        ? this.addresses.CARRACK
        : this.addresses.JOURNEY
    );
    return !!journeyApproved;
  }

  async claimAllLords() {
    const withdraw = await this.getContract().claimLords();
    await withdraw.wait();
    return withdraw;
  }

  async getLordsBalance() {
    const tokenBalances = await this.lordsContract.balanceOf(this.account);
    return parseFloat(ethers.utils.formatEther(tokenBalances));
  }

  async getTotalRealms() {
    const tokenBalances = await this.realmsContract.balanceOf(this.account);
    return tokenBalances.toNumber();
  }

  async getTotalRealmsStaked() {
    const stakedRealmsOnJourney = await this.realmsContract.balanceOf(
      this.addresses.JOURNEY
    );
    const stakedRealmsOnCarrack = await this.realmsContract.balanceOf(
      this.addresses.CARRACK
    );
    return parseInt(stakedRealmsOnJourney) + parseInt(stakedRealmsOnCarrack);
  }

  async getClaimableLords() {
    try {
      const claimable = await this.getContract().lordsAvailable(this.account);
      return parseFloat(ethers.utils.formatEther(claimable));
    } catch (e) {
      return 0;
    }
  }

  async getEpoch() {
    try {
      const epoch = await this.carrackContract.getEpoch();
      return epoch.toNumber() + 10;
    } catch (e) {
      return 0;
    }
  }

  async getTimeToNextEpoc() {
    try {
      const time = await this.carrackContract.getTimeUntilEpoch();
      return time.toNumber();
    } catch (e) {
      return 0;
    }
  }

  async getUnclaimedLordsBalance() {
    const dater = new EthDater(this.provider);
    const startingEpochs = await dater.getEvery(
      'weeks',
      '2022-02-24T11:04:29Z',
      new Date().getTime()
    );

    const blocks = startingEpochs.map((epoch) => epoch.block);
    const queryByBlocks = blocks
      .map((block) => {
        return `
          block_${block}: wallet(id: $address, block: { number: ${block} }) {
            id
            realmsHeld
            bridgedRealmsHeld
          }
      `;
      })
      .join('\n');
    const variables = {
      address: this.account.toLowerCase(),
    };
    const result = await apolloClient.query({
      query: gql`
        query bridgedRealmsByBlock($address: String) @api(name: ecosystem) {
          ${queryByBlocks}
        }
      `,
      variables,
    });

    const queryResult = result?.data ?? {};
    const blockKeys = Object.keys(queryResult).sort();
    let totalUnclaimable = 0;
    for (let i = 1; i < blockKeys.length; i++) {
      const beginEpochRealms = queryResult[blockKeys[i - 1]]
        ? parseInt(queryResult[blockKeys[i - 1]].bridgedRealmsHeld)
        : 0;
      const endEpochRealms = queryResult[blockKeys[i]]
        ? parseInt(queryResult[blockKeys[i]].bridgedRealmsHeld)
        : 0;
      const lordsPerEpoc = i < 6 ? 350 : 196;
      if (endEpochRealms >= beginEpochRealms) {
        totalUnclaimable += beginEpochRealms * lordsPerEpoc;
      } else {
        totalUnclaimable += endEpochRealms * lordsPerEpoc;
      }
    }
    return totalUnclaimable;
  }

  async startJourney(realmIds: number[]) {
    const stake = await this.getContract().boardShip(realmIds);
    const receipt = await stake.wait();
    const event = receipt.events[receipt.events.length - 1];
    return event.args[0];
  }

  async endJourney(realmIds: number[]) {
    const withdraw = await this.getContract().exitShip(realmIds);
    return await withdraw.wait();
  }

  getContract() {
    return this.state.version === 'v2'
      ? this.carrackContract
      : this.journeyContract;
  }

  async refresh() {
    try {
      const [
        totalRealms,
        totalRealmsStaked,
        claimableLordsBalance,
        lordsBalance,
        epoch,
        nextEpoch,
        isApproved,
        unclaimableLordsBalance,
      ] = await Promise.all([
        this.getTotalRealms(),
        this.getTotalRealmsStaked(),
        this.getClaimableLords(),
        this.getLordsBalance(),
        this.getEpoch(),
        this.getTimeToNextEpoc(),
        this.isApprovalSetForAllRealms(),
        this.getUnclaimedLordsBalance(),
      ]);
      this.dispatch({
        totalRealms,
        totalRealmsStaked,
        claimableLordsBalance,
        lordsBalance,
        epoch,
        nextEpochDate: nextEpoch
          ? new Date(new Date().getTime() + nextEpoch * 1000)
          : null,
        isApproved,
        unclaimableLordsBalance,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const defaultJourneyState: JourneyState = {
  totalRealms: 0,
  totalRealmsStaked: 0,
  lordsBalance: 0,
  claimableLordsBalance: 0,
  unclaimableLordsBalance: 0,
  isApproved: false,
  epoch: 0,
  nextEpochDate: null,
  version: 'v1',
};

function journeyReducer(
  state: JourneyState,
  updates: Partial<JourneyState>
): JourneyState {
  if (updates) {
    return { ...state, ...updates };
  }
  return state;
}

const JourneyContext = createContext<{
  state: JourneyState;
  dispatch: Dispatch<Partial<JourneyState>>;
  actions: JourneyActions;
}>(null!);

export function useJourneyContext() {
  return useContext(JourneyContext);
}

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const { signer, account, provider, network } = useWalletContext();
  const [state, dispatch] = useReducer(journeyReducer, {
    ...defaultJourneyState,
  });

  const actions = useMemo(() => {
    const journeyActions = new JourneyActions({
      account,
      signer,
      provider,
      dispatch,
      state,
      network,
    });
    if (account && signer && provider) {
      journeyActions.refresh();
    }
    return journeyActions;
  }, [account, signer, provider, network, state.version]);

  return (
    <JourneyContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </JourneyContext.Provider>
  );
}
