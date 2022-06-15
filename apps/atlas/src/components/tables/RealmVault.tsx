import { Table, Button, ResourceIcon, Spinner } from '@bibliotheca-dao/ui-lib';
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

export function RealmVault(props: RealmsCardProps): ReactElement {
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
              size="sm"
              className="mr-4"
            />
            <span className="self-center text-xs tracking-widest uppercase">
              {findResourceName(re.resourceId)?.trait.replace(' ', '') || ''}
            </span>
          </span>
        ),
        // baseOutput: 100,
        // claimableResources: (claimableResources[index] &&
        //   formatEther(claimableResources[index].toString(10))) || (
        //   <Spinner size="md" scheme="white" variant="bricks" />
        // ),
        raidableResources: (raidableVault[index] &&
          formatEther(raidableVault[index].toString(10))) || (
          <Spinner size="md" scheme="white" variant="bricks" />
        ),
        // level: re.level,
        // build: IsOwner(props.realm?.ownerL2) && (
        //   <Button
        //     variant="secondary"
        //     onClick={() => upgrade(resourceId)}
        //     size="xs"
        //   >
        //     Upgrade
        //   </Button>
        // ),
      };
    }
  );

  const columns = [
    { Header: 'Resource', id: 1, accessor: 'resource' },
    // { Header: 'Base Output', id: 2, accessor: 'baseOutput' },
    // { Header: 'Claimable Resources', id: 2, accessor: 'claimableResources' },
    { Header: 'Raidable', id: 3, accessor: 'raidableResources' },
    // { Header: 'level', id: 4, accessor: 'level' },
    // { Header: 'Build', id: 5, accessor: 'build' },
  ];
  const tableOptions = { is_striped: true };
  return (
    <div className="w-full mb-4">
      {/* <div className="flex justify-between p-2 text-white uppercase">
        <span className="flex flex-col">
          <span>Days Accrued: </span>

          <span className="text-3xl">
            {availableResources.daysAccrued}D {availableResources.remainder}m
          </span>
        </span>
      </div> */}
      <Table columns={columns} data={mappedRowData} options={tableOptions} />
    </div>
  );
}
