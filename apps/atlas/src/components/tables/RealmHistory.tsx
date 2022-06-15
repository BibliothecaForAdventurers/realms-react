import {
  Table,
  Button,
  ResourceIcon,
  Card,
  CardBody,
} from '@bibliotheca-dao/ui-lib';
import { formatEther } from '@ethersproject/units';
import type { ReactElement } from 'react';
import { useGetRealmHistoryQuery } from '@/generated/graphql';
import { shortenAddress } from '@/util/formatters';
import { findResourceName } from '@/util/resources';

interface RealmHistoryProps {
  realmId: number;
}

export function RealmHistory({ realmId }: RealmHistoryProps): ReactElement {
  const columns = [
    { Header: 'Event', id: 1, accessor: 'event' },
    { Header: 'action', id: 2, accessor: 'action' },
    // { Header: 'Outcome', id: 3, accessor: 'outcome' },
  ];

  const { data: historyData, loading: loadingData } = useGetRealmHistoryQuery({
    variables: { filter: { realmId: { equals: realmId } } },
    pollInterval: 5000,
  });
  const successClass = 'bg-green-200/20';
  const negativeClass = 'bg-red-200/20';

  const resourcePillaged = (resources: any) => {
    return (
      <div className="my-4">
        {resources.map((resource, index) => {
          const info = findResourceName(resource.resourceId);
          return (
            <div className="flex justify-between my-1 text-white" key={index}>
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
              size="xs"
              variant="primary"
              href={'/ream/' + event.data?.defendRealmId}
            >
              Pillage and plunder again
            </Button>
          ) : (
            <Button
              size="xs"
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
              💪 Defended raid from {event.data?.defendRealmId}
            </span>
          ) : (
            <span className="">
              🔥 We have been Pillaged by Realm {event.data?.attackRealmId}
            </span>
          ),
          class: event.data?.success ? successClass : negativeClass,
          resources: resourcePillaged(event.data?.pillagedResources),
          action: event.data?.success ? (
            <Button
              size="xs"
              variant="primary"
              href={'/ream/' + event.data?.attackRealmId}
            >
              Try again
            </Button>
          ) : (
            <Button
              size="xs"
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
            <Button size="xs" variant="primary" href={'/ream/' + event.realmId}>
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

  const realmEventData = (historyData?.getRealmHistory ?? [])
    .map((realmEvent) => {
      console.log(historyData?.getRealmHistory);
      return {
        event: genRealmEvent(realmEvent),
        timestamp: realmEvent.timestamp,
      };
    })
    .filter((row) => row.event.event !== '');

  const tableOptions = { is_striped: true, search: false };
  return (
    <div className="flex flex-wrap w-full p-2 space-y-2">
      {realmEventData.map((a, index) => {
        return (
          <Card
            key={index}
            className={`w-full ${loadingData ?? 'animate-pulse'}`}
          >
            <CardBody className={`flex ${a.event.class} `}>
              <span className="py-1 mb-1 text-xs font-semibold text-white">
                {new Date(a.timestamp).toLocaleTimeString('en-US')}{' '}
                {new Date(a.timestamp).toLocaleDateString('en-US')}
              </span>
              <h5 className="text-white">{a.event.event}</h5>
              {a.event?.resources && a.event.resources}
              <div className="mt-4">{a.event.action}</div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
