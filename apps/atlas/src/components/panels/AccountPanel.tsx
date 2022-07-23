import {
  Button,
  IconButton,
  ResourceIcon,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardStats,
  Donut,
  Table,
} from '@bibliotheca-dao/ui-lib';
import Crown from '@bibliotheca-dao/ui-lib/icons/crown-color.svg';
import Ethereum from '@bibliotheca-dao/ui-lib/icons/eth.svg';
import Lords from '@bibliotheca-dao/ui-lib/icons/lords-icon.svg';
import StarkNet from '@bibliotheca-dao/ui-lib/icons/starknet-logo.svg';
import { formatEther } from '@ethersproject/units';
import { useStarknet } from '@starknet-react/core';
import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { ENQUEUED_STATUS } from '@/constants/index';
import { useJourneyContext } from '@/context/JourneyContext';
import { useTransactionQueue } from '@/context/TransactionQueueContext';
import {
  useGetRealmHistoryQuery,
  useGetAccountQuery,
} from '@/generated/graphql';
import {
  getApproveAllGameContracts,
  useApproveLordsForBuilding,
} from '@/hooks/settling/useApprovals';
import useSettling from '@/hooks/settling/useSettling';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { getAccountHex } from '@/shared/Getters/Realm';
import { shortenAddress } from '@/util/formatters';
import { findResourceName } from '@/util/resources';
import realms from '../../geodata/realms.json';
import { useWalletContext } from '../../hooks/useWalletContext';
import { RealmResources } from '../tables/RealmResources';
// import { BankCard } from './Account/AccountCards';
import { BasePanel } from './BasePanel';

export function AccountPanel() {
  /* const { state, actions } = useJourneyContext(); */
  const { connectWallet, isConnected, disconnectWallet, displayName, balance } =
    useWalletContext();
  const { mintRealm } = useSettling();
  const { approveLords, isApproved: isLordsApprovedForBuilding } =
    useApproveLordsForBuilding();
  const { account, connect, connectors, disconnect } = useStarknet();
  const { togglePanelType, toggleMenuType, selectedPanel } = useAtlasContext();

  const [selectedId, setSelectedId] = useState(0);

  const { data: accountData, loading: loadingData } = useGetAccountQuery({
    variables: { account: account ? getAccountHex(account) : '' },
    pollInterval: 10000,
  });

  const getRealmDetails = (realmId: number) =>
    realms.features.find((a: any) => a.properties.realm_idx === realmId)
      ?.properties;

  const realmsCount =
    (accountData?.ownedRealmsCount ?? 0) +
    (accountData?.settledRealmsCount ?? 0);
  const successClass = 'bg-green-200/20';
  const negativeClass = 'bg-red-200/20';

  const resourcePillaged = (resources: any) => {
    return (
      <div className="my-4">
        {resources.map((resource, index) => {
          const info = findResourceName(resource.resourceId);
          return (
            <div
              className="flex justify-between my-1 text-white w-96"
              key={index}
            >
              <div className="flex">
                <ResourceIcon
                  size="xs"
                  className="self-center"
                  resource={info?.trait?.replace('_', '') as string}
                />{' '}
                <span className="self-center ml-4 font-semibold uppercase tracking-veryWide">
                  {info?.trait}
                </span>
              </div>

              <span className="self-center ml-4 font-semibold uppercase tracking-veryWide">
                {(+formatEther(resource.amount)).toFixed()} units
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  function genRealmEvent(event) {
    switch (event.eventType) {
      case 'realm_combat_attack':
        return {
          event: event.data?.success ? (
            <span className="">
              💰 Raid successful on Realm {event.data?.defendRealmId}
            </span>
          ) : (
            `😞 Unsuccessful Raid`
          ),
          class: event.data?.success ? successClass : negativeClass,
          resources: resourcePillaged(event.data?.pillagedResources),
          action: event.data?.success ? (
            <Button
              size="sm"
              variant="primary"
              href={'/ream/' + event.data?.defendRealmId}
            >
              Pillage and plunder again
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              href={'/ream/' + event.data?.defendRealmId}
            >
              Try again
            </Button>
          ),
        };
      case 'realm_combat_defend':
        return {
          event: event.data?.success ? (
            <span className="">
              🔥 We have been Pillaged by Realm {event.data?.attackRealmId}
            </span>
          ) : (
            <span className="">
              💪 Defended raid from {event.data?.defendRealmId}
            </span>
          ),
          class: event.data?.success ? successClass : negativeClass,
          resources: resourcePillaged(event.data?.pillagedResources),
          action: event.data?.success ? (
            <Button
              size="sm"
              variant="primary"
              href={'/ream/' + event.data?.attackRealmId}
            >
              Try again
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              href={'/ream/' + event.data?.attackRealmId}
            >
              ⚔️ muster the troops! to battle!!
            </Button>
          ),
        };
      case 'realm_building_built':
        return {
          event: `🏗️ Built ${event.data?.buildingName}`,
          class: successClass,
          action: '',
        };
      case 'realm_resource_upgraded':
        return {
          event: `🏗️ Upgraded ${event.data?.resourceName} to Level ${event.data?.level}`,
          class: successClass,
          action: '',
        };
      case 'realm_mint':
        return {
          event: `🏗️ Minted Realm ${event.realmId}`,
          class: successClass,
          action: (
            <Button size="sm" variant="primary" href={'/ream/' + event.realmId}>
              Manage Realm
            </Button>
          ),
        };
      case 'realm_settle':
        return {
          event: '🏘️ Settled',
          class: successClass,
          action: '',
        };
      case 'realm_unsettle':
        return {
          event: '🏚️ Unsettled',
          class: successClass,
          action: '',
        };
      default:
        return {
          event: '',
          class: '',
          action: '',
        };
    }
  }

  const realmEventData = (accountData?.accountHistory ?? [])
    .map((realmEvent) => {
      return {
        event: genRealmEvent(realmEvent),
        timestamp: realmEvent.timestamp,
      };
    })
    .filter((row) => row.event.event !== '');

  const tableOptions = { is_striped: true, search: false };
  const columns = [
    { Header: 'Event', id: 1, accessor: 'event' },
    { Header: 'advisor', id: 2, accessor: 'action' },
  ];

  const txQueue = useTransactionQueue();
  const approveTxs = getApproveAllGameContracts();

  return (
    <BasePanel open={selectedPanel === 'account'}>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-start-1 col-end-7 p-8">
          <h1>Ser, Your Vast Empire</h1>
          <p className="mt-8 text-2xl">
            This is your dashboard for all things happen on your lands.
          </p>
        </div>
        <Card className="col-start-1 col-end-3">
          <CardBody>
            <CardTitle>Realms</CardTitle>
            <CardStats className="text-5xl">{realmsCount}</CardStats>
            <Button className="mt-10" variant="primary" size="sm" href="/realm">
              See Realms
            </Button>
          </CardBody>
        </Card>
        <Card className="col-start-3 col-end-5">
          <CardBody>
            <CardTitle>Crypts</CardTitle>
            <CardStats className="text-5xl">20</CardStats>
            <Button className="mt-10" variant="primary" size="sm" href="/crypt">
              See Crypts
            </Button>
          </CardBody>
        </Card>
        <Card className="col-start-5 col-end-8">
          <CardBody>
            <CardTitle>Realm Admin</CardTitle>
            <div className="flex w-full mt-10 space-x-2">
              <Button
                variant="primary"
                className="mt-auto ml-8"
                size="sm"
                onClick={() => toggleMenuType('bridgeRealms')}
              >
                Bridge Realms
              </Button>
              <Button
                className="ml-8"
                variant="primary"
                size="sm"
                onClick={() => toggleMenuType('settleRealms')}
              >
                Settle Realms
              </Button>
            </div>
            <Button
              className="mt-2"
              onClick={() => {
                txQueue
                  .executeMulticall(
                    approveTxs.map((t) => ({ ...t, status: ENQUEUED_STATUS }))
                  )
                  .catch((err) => {
                    // TODO: handle error
                    console.log(err);
                  });
              }}
            >
              Approve All Contracts
            </Button>
          </CardBody>
        </Card>
        <h1 className="col-start-3 col-end-8 mt-8">Ser, your news</h1>
        {realmEventData.map((a, index) => {
          return (
            <Card
              key={index}
              className={`col-start-1 col-end-8 ${
                loadingData ?? 'animate-pulse'
              }`}
            >
              <CardBody className={`flex ${a.event.class} `}>
                <span className="py-1 mb-4 font-semibold text-white">
                  {new Date(a.timestamp).toLocaleTimeString('en-US')}{' '}
                  {new Date(a.timestamp).toLocaleDateString('en-US')}
                </span>
                <h3 className="text-white">{a.event.event}</h3>
                {a.event?.resources && a.event.resources}
                <div className="mt-4">{a.event.action}</div>
              </CardBody>
            </Card>
          );
        })}

        {/* <Card className="col-start-5 col-end-9">
          <CardBody>
            <CardTitle>Resources + Lords</CardTitle>
            <BankCard/>
            <Button
              variant="primary"
              size="sm"
              className="mt-auto"
              href="/bank"
            >
              Go to Bank
            </Button>
          </CardBody>
        </Card> */}
        <Card className="col-start-1 col-end-6">
          <CardBody>
            <CardTitle>Mint Test Realms [card only for alpha]</CardTitle>
            <input
              placeholder="Type Id"
              type={'number'}
              className="w-3/12 p-2 mx-auto mb-2 text-black rounded bg-white/80"
              value={selectedId}
              onChange={(e) => {
                setSelectedId(parseInt(e.target.value));
              }}
              min="1"
              max="8000"
            />
            <Button
              className="ml-8"
              variant="primary"
              size="sm"
              onClick={() => mintRealm(selectedId)}
            >
              Mint Realms
            </Button>
          </CardBody>
        </Card>
      </div>
    </BasePanel>
  );
}
