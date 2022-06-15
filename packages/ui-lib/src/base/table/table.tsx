/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import { ArrayUtils } from '@bibliotheca-dao/core-lib';
import type { AccessorFn } from '@tanstack/react-table';
import {
  Column,
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table';
import { useReducer, useState } from 'react';
import type { ReactElement } from 'react';
import { Button } from '../button';

type ColumnType = {
  Header: string;
  id: number;
  accessor: string;
};
type TableOptions = {
  is_striped?: boolean;
  search?: boolean;
};

type TableProps = {
  data: any;
  columns: Array<any>;
  options?: TableOptions;
};

export function Table({ data, columns: customColumns, options }: TableProps) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = createTable().setRowType<typeof data>();
  const { createDataColumn } = table;

  const defaultColumns = customColumns?.map((column) => {
    return createDataColumn(column.accessor, {
      header: column.Header,
      cell: (info) => info.getValue(),
      footer: (props: { column: { id: any } }) => props.column.id,
    });
  });

  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full">
      {options?.search && (
        <div>
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="p-2 text-gray-600 border rounded font-lg bg-white-600/40 border-block"
            placeholder="Search..."
          />
        </div>
      )}

      <table className="w-full text-left text-white rounded-xl">
        <thead className="uppercase rounded-xl">
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-2 text-xs tracking-widest text-center border border-gray-500/60"
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="shadow-inner rounded-xl">
          {instance.getRowModel().rows.map((row, index) => (
            <tr
              className={`${
                !ArrayUtils.isEven(index + 1) && options?.is_striped
                  ? 'bg-gray-600/60'
                  : 'bg-gray-600/20'
              } hover:bg-white-600/90 font-semibold shadow-inner`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="p-2 mx-auto text-left border border-gray-500/60"
                  key={cell.id}
                >
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
