import {
  Table,
  Button,
  ResourceIcon,
  Spinner,
  CountdownTimer,
} from '@bibliotheca-dao/ui-lib';
import { formatEther } from '@ethersproject/units';
import type { ReactElement } from 'react';
import { toBN } from 'starknet/dist/utils/number';
import useResources from '@/hooks/settling/useResources';
import { IsOwner } from '@/shared/Getters/Realm';
import { resources, findResourceName } from '@/util/resources';

import type { RealmsCardProps } from '../../types';

type Row = {
  resource: ReactElement;
  // baseOutput: number;
  claimableResources: string | ReactElement;
  // totalOutput: number;
  level: number;
  build: ReactElement;
};

export function RealmResources(props: RealmsCardProps): ReactElement {
  const {
    availableResources,
    raidableVault,
    claim,
    upgrade,
    claimableLords,
    claimableResources,
    loadingClaimable,
  } = useResources({
    token_id: props.realm.realmId,
    resources: props.realm.resources,
  });
  const mappedRowData: Row[] = (props.realm.resources as any).map(
    (re, index) => {
      const resourceId =
        resources.find((res) => res.trait === re.type)?.id || 0;
      return {
        resource: (
          <span className="flex">
            <ResourceIcon
              resource={
                findResourceName(re.resourceId)?.trait.replace(' ', '') || ''
              }
              size="md"
              className="mr-4"
            />
            <span className="self-center font-semibold tracking-widest uppercase">
              {re.type || ''}
            </span>
          </span>
        ),
        // baseOutput: 100,
        claimableResources: (claimableResources[index] &&
          formatEther(claimableResources[index].toString(10))) || (
          <Spinner size="md" scheme="white" variant="bricks" />
        ),
        raidableResources: (raidableVault[index] &&
          formatEther(raidableVault[index].toString(10))) || (
          <Spinner size="md" scheme="white" variant="bricks" />
        ),
        level: re.level,
        build: IsOwner(props.realm?.ownerL2) && (
          <Button
            variant="secondary"
            onClick={() => upgrade(resourceId)}
            size="xs"
          >
            Upgrade
          </Button>
        ),
      };
    }
  );

  const columns = [
    { Header: 'Resource', id: 1, accessor: 'resource' },
    // { Header: 'Base Output', id: 2, accessor: 'baseOutput' },
    { Header: 'Claimable Resources', id: 2, accessor: 'claimableResources' },
    { Header: 'Raidable Resources', id: 3, accessor: 'raidableResources' },
    { Header: 'level', id: 4, accessor: 'level' },
    // { Header: 'Build', id: 5, accessor: 'build' },
  ];
  const tableOptions = { is_striped: true };
  return (
    <div className="w-full">
      <div className="flex justify-between p-2 text-white uppercase">
        <span className="flex flex-col">
          <span> Claimable Lords:</span>

          <span className="text-3xl">
            {' '}
            {claimableLords ? (
              formatEther(claimableLords.toString(10))
            ) : (
              <Spinner
                className="ml-4"
                size="md"
                scheme="white"
                variant="bricks"
              />
            )}
          </span>
        </span>
        <span className="flex flex-col">
          <span>Days Accrued: </span>
          {/* <CountdownTimer date={'16544528050000'} /> */}
          <span className="text-3xl">{availableResources.daysAccrued}D</span>
        </span>
      </div>
      <Table columns={columns} data={mappedRowData} options={tableOptions} />

      {IsOwner(props.realm?.settledOwner) && (
        <Button
          size="sm"
          className="mt-3 ml-2"
          variant="primary"
          onClick={() => claim()}
        >
          Harvest Resources
        </Button>
      )}
      {!IsOwner(props.realm?.settledOwner) && (
        <Button
          size="sm"
          href={
            `/combat?` +
            `defendingRealmId=` +
            props.realm.realmId +
            '&attackingRealmId=5500'
          }
          className="mt-3 ml-2"
          variant="primary"
        >
          Raid Vault
        </Button>
      )}
    </div>
  );
}
