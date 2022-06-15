import { Button, Table } from '@bibliotheca-dao/ui-lib/base';
import Lords from '@bibliotheca-dao/ui-lib/icons/lords-icon.svg';
import { Popover } from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ItemCost, TroopInterface } from '@/types/index';
interface HealthBarProps {
  vitality: number;
  troopId: number;
}

interface TroopProps {
  troop: TroopInterface;
  className?: string;
  withPurchase?: boolean;
  onSubmit: (value: TroopInterface) => void;
  onRemove: (value: TroopInterface) => void;
  troopsStats: TroopInterface[];
}

const troopList = [
  {
    name: 'watchman',
    type: 'melee',
    troopId: 1,
    tier: 1,
    agility: 1,
    attack: 1,
    defense: 3,
    vitality: 4,
    wisdom: 1,
  },
  {
    name: 'guard',
    type: 'melee',
    tier: 2,
    troopId: 2,
    agility: 2,
    attack: 2,
    defense: 6,
    vitality: 8,
    wisdom: 2,
  },
  {
    name: 'guard captain',
    type: 'melee',
    tier: 3,
    troopId: 3,
    agility: 4,
    attack: 4,
    defense: 12,
    vitality: 16,
    wisdom: 4,
  },
  {
    name: 'squire',
    type: 'melee',
    tier: 1,
    troopId: 4,
    agility: 1,
    attack: 4,
    defense: 1,
    vitality: 4,
    wisdom: 3,
  },

  {
    name: 'Knight',
    type: 'melee',
    tier: 2,
    troopId: 5,
    agility: 4,
    attack: 4,
    defense: 12,
    vitality: 16,
    wisdom: 4,
  },
  {
    name: 'Knight Commander',
    type: 'melee',
    tier: 3,
    troopId: 6,
    agility: 4,
    attack: 16,
    defense: 4,
    vitality: 4,
    wisdom: 12,
  },
  {
    name: 'Scout',
    type: 'Ranged',
    tier: 1,
    troopId: 7,
    agility: 4,
    attack: 3,
    defense: 1,
    vitality: 1,
    wisdom: 1,
  },
  {
    name: 'archer',
    type: 'ranged',
    tier: 2,
    troopId: 8,
    agility: 8,
    attack: 6,
    defense: 2,
    vitality: 2,
    wisdom: 2,
  },
  {
    name: 'sniper',
    type: 'ranged',
    tier: 3,
    troopId: 9,
    agility: 16,
    attack: 12,
    defense: 4,
    vitality: 4,
    wisdom: 4,
  },
  {
    name: 'Scorpio',
    type: 'Siege',
    tier: 1,
    troopId: 10,
    agility: 1,
    attack: 4,
    defense: 1,
    vitality: 3,
    wisdom: 1,
  },
  {
    name: 'Ballista',
    type: 'Siege',
    tier: 2,
    troopId: 11,
    agility: 2,
    attack: 8,
    defense: 2,
    vitality: 6,
    wisdom: 2,
  },
  {
    name: 'Catapult',
    type: 'Siege',
    tier: 3,
    troopId: 12,
    agility: 4,
    attack: 16,
    defense: 4,
    vitality: 12,
    wisdom: 4,
  },
  {
    name: 'Apprentice',
    type: 'ranged',
    tier: 1,
    troopId: 13,
    agility: 2,
    attack: 2,
    defense: 1,
    vitality: 1,
    wisdom: 4,
  },
  {
    name: 'Mage',
    type: 'ranged',
    tier: 2,
    troopId: 14,
    agility: 4,
    attack: 4,
    defense: 2,
    vitality: 2,
    wisdom: 8,
  },
  {
    name: 'Arcanist',
    type: 'ranged',
    tier: 3,
    troopId: 15,
    agility: 8,
    attack: 8,
    defense: 4,
    vitality: 4,
    wisdom: 16,
  },
  {
    name: 'GrandMarshal',
    type: 'ranged',
    tier: 3,
    troopId: 16,
    agility: 16,
    attack: 16,
    defense: 16,
    vitality: 16,
    wisdom: 16,
  },
];

export const HealthBar = (props: HealthBarProps) => {
  const getVitality = () => {
    const vit =
      troopList.find((a) => a.troopId === props.troopId)?.vitality ?? 0;
    return (props.vitality / vit) * 100;
  };

  const getColour = () => {
    const vit = getVitality();
    if (vit > 70) {
      return 'bg-green-400 ';
    } else if (vit > 50) {
      return 'bg-yellow-200 ';
    } else if (vit > 25) {
      return 'bg-red-200 ';
    } else {
      return 'bg-red-500 ';
    }
  };

  return (
    <div
      style={{
        marginTop: `${100 - getVitality()}%`,
      }}
      className={`relative bottom-0 w-1 rounded-tl rounded-br rotate-180 transform mr-1 ${getColour()}`}
    ></div>
  );
};

export const TroopType = () => {
  return <div></div>;
};

const STYLES = {
  tier: {
    1: 'w-10 h-16',
    2: 'w-24 h-16',
    3: 'w-48 h-20',
  },
} as const;

const columns = [
  { Header: 'name', id: 1, accessor: 'name' },
  // { Header: 'agility', id: 2, accessor: 'agility' },
  // { Header: 'Base Output', id: 2, accessor: 'baseOutput' },
  // { Header: 'attack', id: 3, accessor: 'attack' },
  // { Header: 'defense', id: 4, accessor: 'defense' },
  // { Header: 'vitality', id: 5, accessor: 'vitality' },
  // { Header: 'wisdom', id: 6, accessor: 'wisdom' },
  { Header: 'add', id: 6, accessor: 'add' },
  { Header: 'cost', id: 6, accessor: 'troopCost' },
];

const tableOptions = { is_striped: true };

type Row = {
  name: string;
  // agility: number;
  // attack: number;
  // defense: number;
  // vitality: number;
  // wisdom: number;
  troopCost: any[];
};

export const Troop = (props: TroopProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const getTroop = () => {
    return props.troopsStats?.find(
      (a: TroopInterface) => a.troopId === props.troop.troopId
    );
  };

  const getTroopTierList = () => {
    return props?.troopsStats?.filter(
      (a: TroopInterface) => a.tier === props.troop.tier
    );
  };

  const troopCostCell = (cost: ItemCost) => {
    // console.log(cost);
    return (
      <div className="w-24">
        <div className="flex justify-between">
          <Lords className="w-4" /> {cost.amount}
        </div>

        {cost.resources.map((a, index) => {
          return (
            <div key={index} className="flex justify-between">
              <span>{a.resourceName}</span> <span>{a.amount}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const mappedRowData: Row[] = (getTroopTierList() as any)?.map((re, index) => {
    return {
      name: <span className="tracking-wider uppercase">{re.troopName}</span>,
      // agility: re.agility,
      // attack: re.attack,
      // defense: re.defense,
      // vitality: re.vitality,
      // wisdom: re.wisdom,
      troopCost: troopCostCell(re.troopCost),
      add: (
        <Button
          variant="secondary"
          size="xs"
          onClick={() => {
            props.onSubmit(re);
          }}
        >
          add
        </Button>
      ),
    };
  });

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`${twMerge(
        STYLES.tier[props.troop.tier],
        props.className
      )} bg-white/30 rounded shadow-inner flex`}
    >
      <HealthBar
        troopId={props.troop.troopId}
        vitality={props.troop.vitality}
      />

      <div className="mt-auto text-xs text-center text-black uppercase font-body">
        {getTroop()?.troopName?.substring(0, 5)}
      </div>
      {/* {!props.withPurchase && (
        <Button
          variant="secondary"
          size="xs"
          onClick={() => {
            props.onRemove(props.troop);
          }}
        >
          x
        </Button>
      )} */}

      {/* {props.withPurchase && props.troop.vitality === 0 && ( */}
      <Popover className="relative top-0">
        <div ref={ref}>
          {isOpen && (
            <Popover.Panel
              className="absolute z-50 m-auto bottom-10 md:left-0"
              static
            >
              <div className="p-2 text-sm text-white bg-black rounded shadow-sm">
                <h5>{props.troop.troopName}</h5>
                Vitality: {props.troop.vitality}
                {/* <Table
                    columns={columns}
                    data={mappedRowData}
                    options={tableOptions}
                  /> */}
              </div>
            </Popover.Panel>
          )}
        </div>
      </Popover>
      {/* )} */}
    </div>
  );
};
