import { Table, Button, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { formatEther } from '@ethersproject/units';
import type { ReactElement } from 'react';
import { useResourcesContext } from '@/context/ResourcesContext';
import { useGetRealmQuery } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';

type Row = {
  resource: ReactElement;
  balance: string;
  output: number;
  change: number;
  rate: string;
  action: ReactElement;
};

export function BankPanel(): ReactElement {
  const { togglePanelType, selectedPanel } = useAtlasContext();
  const { balance } = useResourcesContext();

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
      balance: formatEther(resource.amount),
      output: 0,
      change: resource.percentChange,
      rate: (+formatEther(resource.rate)).toFixed(4),
      action: (
        <Button variant="secondary" size="xs">
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
    <div>
      <div className="flex justify-between">
        <div className="sm:hidden"></div>
        <h1 className="w-full text-center">Iron Bank</h1>
        <button
          className="mb-8 transition-all rounded "
          onClick={() => togglePanelType('bank')}
        >
          <Close />
        </button>
      </div>

      <div className="relative overflow-x-auto">
        {data && (
          <Table columns={columns} data={defaultData} options={tableOptions} />
        )}
      </div>
    </div>
  );
}
