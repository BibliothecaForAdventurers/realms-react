import { useStarknet } from '@starknet-react/core';
import { ethers, BigNumber } from 'ethers';
import type { RealmFragmentFragment } from '@/generated/graphql';
import { useWalletContext } from '@/hooks/useWalletContext';
import type { TroopInterface } from '@/types/index';
import { shortenAddress } from '@/util/formatters';

interface TraitProps {
  trait: string;
  traitAmount?: number;
}

export const RealmStatus = (realm: RealmFragmentFragment) => {
  if (realm.bridgedOwner) {
    return 'Bridge Pending';
  }
  if (realm.settledOwner) {
    return 'Settled L2';
  }
  if (realm.ownerL2) {
    return 'Unsettled L2';
  } else {
    return 'Layer 1';
  }
};

export const RealmOwner = (realm: RealmFragmentFragment) => {
  console.log(realm);
  return (
    realm?.settledOwner ||
    realm?.ownerL2 ||
    realm?.bridgedOwner ||
    realm?.owner ||
    '0'
  );
};

export const TraitTable = (props: TraitProps) => {
  const traitSet = [
    {
      trait: 'Region',
      colour: 'bg-green-200/70',
      traitMax: 7,
      title: 'Regions',
    },
    { trait: 'City', colour: 'bg-amber-300/70', traitMax: 21, title: 'Cities' },
    {
      trait: 'Harbor',
      colour: 'bg-amber-500/70',
      traitMax: 35,
      title: 'Harbors',
    },
    {
      trait: 'River',
      colour: 'bg-blue-700/70',
      traitMax: 60,
      title: 'Rivers',
    },
  ];

  const getTrait = () => {
    return traitSet.find((a) => a.trait == props.trait);
  };

  const getWidth = () => {
    return ((props.traitAmount as any) / (getTrait()?.traitMax || 0)) * 100;
  };

  return (
    <div>
      <span className="flex justify-between font-semibold font-body">
        <span className="tracking-widest uppercase">{getTrait()?.title} </span>
        <span>
          {props.traitAmount} / {getTrait()?.traitMax}{' '}
        </span>
      </span>
      <div className="w-full my-1 rounded-full bg-gray-100/20">
        <div
          className={`h-3 ${getTrait()?.colour} shadow-inner rounded-full`}
          style={{
            width: `${getWidth()}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export const IsOwner = (owner?: string | null) => {
  const { account } = useStarknet();
  const starknetWallet = account ? BigNumber.from(account).toHexString() : '';

  if (account) {
    return starknetWallet == owner ? true : false;
  } else {
    return false;
  }
};

export const getOrder = (realm: RealmFragmentFragment) => {
  return realm.orderType.toLowerCase();
};

export const getAccountHex = (account: string) => {
  return ethers.BigNumber.from(account).toHexString();
};

export const squadStats = (squad: TroopInterface[] | undefined | null) => {
  if (!squad) {
    return { agility: 0, attack: 0, defense: 0, vitality: 0, wisdom: 0 };
  }
  return {
    agility: squad
      .map((troop) => troop.agility)
      .reduce((prev, curr) => prev + curr, 0),
    attack: squad
      .map((troop) => troop.attack)
      .reduce((prev, curr) => prev + curr, 0),
    defense: squad
      .map((troop) => troop.defense)
      .reduce((prev, curr) => prev + curr, 0),
    vitality: squad
      .map((troop) => troop.vitality)
      .reduce((prev, curr) => prev + curr, 0),
    wisdom: squad
      .map((troop) => troop.wisdom)
      .reduce((prev, curr) => prev + curr, 0),
  };
};
