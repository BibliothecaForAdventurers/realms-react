import { Table, Button } from '@bibliotheca-dao/ui-lib';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useTransactionQueue } from '@/context/TransactionQueueContext';
import { useGetBuildingsByRealmIdQuery } from '@/generated/graphql';
import { ModuleAddr } from '@/hooks/settling/stark-contracts';
import { createCall, Entrypoints } from '@/hooks/settling/useBuildings';
import { IsOwner } from '@/shared/Getters/Realm';
import { Scroll } from '@/shared/Icons';
import type { RealmsCall, RealmsCardProps } from '../../types';
import PreviewBuild from '../PreviewBuild';
import Sidebar from '../sidebars/AtlasSideBar';

type Row = {
  building: ReactElement;
  requirements: ReactElement;
  built: ReactElement;
  population: ReactElement;
  culture: ReactElement;
  food: ReactElement;
  buildAction: any;
};

export function RealmBuildings(props: RealmsCardProps): ReactElement {
  const { data } = useGetBuildingsByRealmIdQuery({
    variables: { id: props.realm.realmId },
  });

  const txQueue = useTransactionQueue();

  const [previewBuild, setPreviewBuild] = useState<any>();

  const buildings = data?.getBuildingsByRealmId ?? [];

  const [buildingsInQueue, setBuildingsInQueue] = useState<
    Pick<RealmsCall, 'metadata'>[]
  >([]);

  useEffect(() => {
    const buildingsToBuild = txQueue.transactions.filter(
      (tx) =>
        tx.contractAddress == ModuleAddr.Building &&
        tx.entrypoint == Entrypoints.build
    );
    setBuildingsInQueue(
      buildingsToBuild.map((b) => ({ metadata: b.metadata }))
    );
  }, [txQueue.transactions]);

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
    const queued = buildingsInQueue.filter(
      (b) =>
        b.metadata.buildingId === building.buildingId &&
        b.metadata.realmId === building.realmId
    );

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
      built: (
        <p className="relative w-full">
          {building.count}{' '}
          {queued.length > 0 ? (
            <span className="absolute right-0">
              <Scroll className="inline-block w-4 mr-1 fill-green-200" />
              {`+${queued.length}`}
            </span>
          ) : (
            ''
          )}
        </p>
      ),
      buildAction: IsOwner(props.realm?.settledOwner) && (
        <Button
          aria-details="Build Building on Realm"
          onClick={() => {
            setPreviewBuild(building);
          }}
          variant="primary"
          type="button"
          size="xs"
        >
          Preview
        </Button>
      ),
    };
  });

  return (
    <div className="w-full mt-2">
      <Table columns={columns} data={defaultData} options={tableOptions} />
      <Sidebar isOpen={!!previewBuild}>
        <div className="flex justify-between">
          <p className="text-gray-400">Build Preview</p>
          <button
            onClick={() => {
              setPreviewBuild(undefined);
            }}
          >
            Close
          </button>
        </div>
        <PreviewBuild building={previewBuild} />
        <div className="w-full p-4 absolute left-0 bottom-0">
          <Button
            onClick={() => {
              txQueue.add(
                createCall.build({
                  realmId: props.realm.realmId,
                  buildingId: previewBuild.buildingId,
                })
              );
            }}
            variant="primary"
            className="w-full"
          >
            Build {previewBuild?.buildingName}
          </Button>
        </div>
      </Sidebar>
    </div>
  );
}
