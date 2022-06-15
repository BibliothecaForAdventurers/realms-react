import { Table, Button } from '@bibliotheca-dao/ui-lib';
import type { ReactElement } from 'react';
import { useGetBuildingsByRealmIdQuery } from '@/generated/graphql';
import useBuildings from '@/hooks/settling/useBuildings';
import { IsOwner } from '@/shared/Getters/Realm';
import type { RealmsCardProps } from '../../types';

type Row = {
  building: ReactElement;
  requirements: ReactElement;
  built: number;
  population: ReactElement;
  culture: ReactElement;
  food: ReactElement;
  buildAction: any;
};

export function RealmBuildings(props: RealmsCardProps): ReactElement {
  const { data } = useGetBuildingsByRealmIdQuery({
    variables: { id: props.realm.realmId },
  });

  const buildings = data?.getBuildingsByRealmId ?? [];
  const { build } = useBuildings();
  const columns = [
    { Header: 'Building', id: 1, accessor: 'building' },
    { Header: 'Requirements', id: 2, accessor: 'requirements' },
    { Header: 'Population', id: 3, accessor: 'population' },
    { Header: 'Culture', id: 4, accessor: 'culture' },
    { Header: 'Food', id: 4, accessor: 'food' },
    { Header: 'Built', id: 5, accessor: 'built' },
    { Header: 'Build', id: 6, accessor: 'buildAction' },
  ];
  const tableOptions = { is_striped: true };
  const formatStat = (stat: number): string => {
    return stat > 0 ? `+${stat}` : `${stat}`;
  };

  const defaultData: Row[] = buildings.map((building) => {
    return {
      building: (
        <span className="tracking-widest uppercase">
          {building.buildingName}
        </span>
      ),
      requirements: (
        <span className="tracking-widest uppercase">
          {building.limitTraitName}
        </span>
      ),
      population: (
        <span>
          {parseInt(formatStat(building.population)) * building.count}{' '}
          <span className="text-white/50 ">
            ({formatStat(building.population)})
          </span>{' '}
        </span>
      ),
      culture: (
        <span>
          {parseInt(formatStat(building.culture)) * building.count}{' '}
          <span className="text-xs text-white/50">
            ({formatStat(building.culture)})
          </span>{' '}
        </span>
      ),
      food: (
        <span>
          {parseInt(formatStat(building.food)) * building.count}{' '}
          <span className="text-xs text-white/50">
            ({formatStat(building.food)})
          </span>{' '}
        </span>
      ),
      built: building.count,
      buildAction: IsOwner(props.realm?.settledOwner) && (
        <Button
          aria-details="klajsfl"
          onClick={() => build(props.realm.realmId, building.buildingId)}
          variant="primary"
          type="button"
          size="xs"
        >
          Build
        </Button>
      ),
    };
  });

  return (
    <div className="w-full mt-2">
      <Table columns={columns} data={defaultData} options={tableOptions} />
      {IsOwner(props.realm?.settledOwner) && (
        <div className="flex justify-end w-full mt-4">
          <Button size="xs" variant="primary">
            Build All
          </Button>
        </div>
      )}
    </div>
  );
}
