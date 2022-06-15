import { Button, OrderIcon } from '@bibliotheca-dao/ui-lib';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { OrderType } from '@/generated/graphql';
import { useOnClickOutsideElement } from '@/hooks/useOnClickOutsideElement';

type OrdersFilterProps = {
  selectedValues: OrderType[];
  onChange(selected: OrderType[]): void;
};

type OrderOption = {
  name: string;
  value: OrderType;
};

export function OrdersFilter(props: OrdersFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickOrderOption = (option: OrderOption) => {
    const newValues = props.selectedValues.filter(
      (value) => value !== option.value
    );
    if (newValues.length === props.selectedValues.length) {
      newValues.push(option.value);
    }
    // setSelected([...newValues]);
    props.onChange([...newValues]);
  };

  const isSelected = (option: OrderOption) =>
    props.selectedValues.indexOf(option.value) > -1;

  const ref = useRef(null);
  useOnClickOutsideElement(ref, () => {
    setIsOpen(false);
  });

  const orders = [
    { name: 'Power', value: OrderType.Power },
    { name: 'Anger', value: OrderType.Anger },
    { name: 'Brilliance', value: OrderType.Brilliance },
    { name: 'Detection', value: OrderType.Detection },
    { name: 'Enlightenment', value: OrderType.Enlightenment },
    { name: 'The Fox', value: OrderType.TheFox },
    { name: 'Fury', value: OrderType.Fury },
    { name: 'Giants', value: OrderType.Giants },
    { name: 'Perfection', value: OrderType.Perfection },
    { name: 'Reflection', value: OrderType.Reflection },
    { name: 'Skill', value: OrderType.Skill },
    { name: 'Titans', value: OrderType.Titans },
    { name: 'The Twins', value: OrderType.TheTwins },
    { name: 'Vitriol', value: OrderType.Vitriol },
    { name: 'Rage', value: OrderType.Rage },
    { name: 'Protection', value: OrderType.Protection },
  ];

  return (
    <Popover className="relative">
      <div ref={ref}>
        <Button
          variant="primary"
          size="sm"
          className={clsx(props.selectedValues.length > 0 ? 'bg-black' : '')}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Orders
        </Button>

        {isOpen && (
          <Popover.Panel
            className="absolute z-10 mt-2 w-[280px] ml-2 m-auto -translate-x-1/2 md:-translate-x-1/2 shadow-2xl"
            static
          >
            <div className="flex flex-col items-center gap-4 p-4 pb-8 font-medium text-white bg-black rounded shadow-sm">
              <h4>Search by Orders</h4>

              <div className="relative grid items-center justify-center grid-cols-4 gap-6">
                {orders.map((order, idx) => (
                  <div
                    role="button"
                    key={order.value}
                    tabIndex={idx}
                    className={clsx(
                      'flex items-center justify-center cursor-pointer rounded-sm px-6 hover:bg-gray-200/20 duration-150 transition-all',
                      isSelected(order) ? 'bg-gray-200/20' : ''
                    )}
                    onClick={() => handleOnClickOrderOption(order)}
                    aria-hidden="true"
                  >
                    <OrderIcon
                      withTooltip
                      order={order.name.toLowerCase()}
                      size="md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Popover.Panel>
        )}
      </div>
    </Popover>
  );
}
