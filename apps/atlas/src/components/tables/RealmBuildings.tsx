import { Table, Button, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import type { ReactElement } from 'react';
import useBuildings from '@/hooks/settling/useBuildings';
import { buildings } from '@/util/buildings';
import type { RealmsCardProps } from '../../types';

type Row = {
  building: string;
  requirements: string;
  built: number;
  buildAction: ReactElement;
};

export function RealmBuildings(props: RealmsCardProps): ReactElement {
  const { build } = useBuildings({
    token_id: props.realm.realmId,
  });
  const columns = [
    { Header: 'Building', id: 1, accessor: 'building' },
    { Header: 'Requirements', id: 2, accessor: 'requirements' },
    { Header: 'Built', id: 3, accessor: 'built' },
    { Header: 'Build', id: 3, accessor: 'buildAction' },
  ];
  const tableOptions = { is_striped: true };
  const realmBuildings = props.realm.buildings;

  const defaultData: Row[] = buildings.map((building) => {
    return {
      building: building.name,
      requirements: building.limit,
      built: realmBuildings?.find(
        (realmBuilding) => realmBuilding.buildingId === building.id
      )
        ? 1
        : 0,
      buildAction: (
        <Button
          onClick={() => build(building.id)}
          variant="primary"
          type="button"
        >
          Build
        </Button>
      ),
    };
  });

  return (
    <div className="p-2">
      <Table columns={columns} data={defaultData} options={tableOptions} />
      <div className="flex justify-end w-full pt-4">
        <Button variant="primary">Build All</Button>
      </div>
    </div>
  );
}
