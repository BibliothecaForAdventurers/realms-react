import { Table } from '@bibliotheca-dao/ui-lib/base';

interface Props {
  statistics: any;
}
const columns = [
  { Header: 'name', id: 1, accessor: 'name' },
  { Header: 'agility', id: 2, accessor: 'agility' },
  { Header: 'attack', id: 3, accessor: 'attack' },
  { Header: 'defense', id: 4, accessor: 'defense' },
  { Header: 'vitality', id: 5, accessor: 'vitality' },
  { Header: 'wisdom', id: 6, accessor: 'wisdom' },
  //   { Header: 'add', id: 6, accessor: 'add' },
  { Header: 'cost', id: 6, accessor: 'troopCost' },
];

const tableOptions = { is_striped: true };

type Row = {
  name: string;
  agility: number;
  attack: number;
  defense: number;
  vitality: number;
  wisdom: number;
  troopCost: any[];
};

export const MilitaryStatistics = (props: Props) => {
  const mappedRowData: Row[] = (props.statistics as any)?.map((re, index) => {
    return {
      name: (
        <span className="text-xs tracking-wider uppercase">{re.troopName}</span>
      ),
      agility: re.agility,
      attack: re.attack,
      defense: re.defense,
      vitality: re.vitality,
      wisdom: re.wisdom,
      troopCost: 2,
      //   add: (
      //     <Button
      //       variant="secondary"
      //       size="xs"
      //       onClick={() => {
      //         props.onSubmit(re);
      //       }}
      //     >
      //       add
      //     </Button>
      //   ),
    };
  });

  return (
    <div>
      {' '}
      {mappedRowData && (
        <Table columns={columns} data={mappedRowData} options={tableOptions} />
      )}
    </div>
  );
};
