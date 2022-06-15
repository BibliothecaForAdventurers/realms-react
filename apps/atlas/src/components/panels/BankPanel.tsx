import { Table, Button, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { formatEther } from '@ethersproject/units';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { useResourcesContext } from '@/context/ResourcesContext';
import { useGetRealmQuery } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { BasePanel } from './BasePanel';

type Row = {
  resource: ReactElement;
  balance: string;
  output: number;
  change: ReactElement;
  rate: string;
  action: ReactElement;
};

export const RateChange = (change: number) => {
  const x = (change * 100).toFixed(2);
  return (
    <span
      className={`${parseInt(x) < 0 ? 'text-red-300' : 'text-green-300/80'}`}
    >
      + {x} %
    </span>
  );
};

export function BankPanel(): ReactElement {
  const { selectedPanel } = useAtlasContext();
  const {
    lordsBalance,
    balance,
    availableResourceIds,
    addSelectedSwapResources,
  } = useResourcesContext();

  const defaultData: Row[] = balance?.map((resource) => {
    return {
      resource: (
        <div className="flex mr-4">
          <ResourceIcon
            resource={resource?.resourceName?.replace(' ', '') || ''}
            size="sm"
          />

          <span className="self-center ml-4 tracking-widest uppercase">
            {resource?.resourceName}
          </span>
        </div>
      ),
      balance: (+formatEther(resource.amount)).toFixed(),
      output: 0,
      change: RateChange(resource.percentChange),
      rate: (+formatEther(resource.rate)).toFixed(4),
      action: (
        <Button
          variant="secondary"
          size="xs"
          onClick={() => {
            addSelectedSwapResources(resource.resourceId);
          }}
          disabled={!availableResourceIds.includes(resource.resourceId)}
        >
          Trade
        </Button>
      ),
    };
  });
  const columns = [
    { Header: 'Resource', id: 1, accessor: 'resource' },
    { Header: 'Balance', id: 2, accessor: 'balance' },
    { Header: 'Output', id: 3, accessor: 'output' },
    { Header: 'Change', id: 4, accessor: 'change' },
    { Header: 'Rate', id: 5, accessor: 'rate' },
    { Header: 'Action', id: 6, accessor: 'action' },
  ];
  const tableOptions = { is_striped: true };
  const { data } = useGetRealmQuery({
    variables: {
      id: 1, // value for 'id'
    },
  });
  return (
    <BasePanel open={selectedPanel === 'bank'} style="lg:w-7/12">
      <div className="flex justify-between">
        <div className="sm:hidden"></div>
        <div className="w-full">
          <h1 className="w-full text-center font-lords">Iron Bank</h1>
          <h4 className="p-2 my-4 text-center rounded shadow-inner bg-white/20">
            Your Lords Balance: {(+formatEther(lordsBalance)).toFixed(2)}
          </h4>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {data && (
          <Table columns={columns} data={defaultData} options={tableOptions} />
        )}
      </div>
    </BasePanel>
  );
}
