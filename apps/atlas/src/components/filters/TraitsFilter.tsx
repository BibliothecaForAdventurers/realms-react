import { Button } from '@bibliotheca-dao/ui-lib';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { RealmTraitType } from '@/generated/graphql';
import { useOnClickOutsideElement } from '@/hooks/useOnClickOutsideElement';
import { RangeSliderFilter } from './RangeSliderFilter';

const RegionMax = 7;
const CityMax = 21;
const HarbourMax = 35;
const RiverMax = 60;

type Traits = {
  [RealmTraitType.Region]: number;
  [RealmTraitType.City]: number;
  [RealmTraitType.Harbor]: number;
  [RealmTraitType.River]: number;
};

type TraitsFilterProps = {
  traits: Traits;
  onChange(traits: Traits): void;
};

export function TraitsFilter(props: TraitsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useOnClickOutsideElement(ref, () => {
    setIsOpen(false);
  });

  const onRegionFilterChange = (value: number) => {
    const updatedTraits = { ...props.traits, [RealmTraitType.Region]: value };
    props.onChange(updatedTraits);
  };

  const onCityFilterChange = (value: number) => {
    const updatedTraits = { ...props.traits, [RealmTraitType.City]: value };
    props.onChange(updatedTraits);
  };

  const onHarbourFilterChange = (value: number) => {
    const updatedTraits = { ...props.traits, [RealmTraitType.Harbor]: value };
    props.onChange(updatedTraits);
  };

  const onRiverFilterChange = (value: number) => {
    const updatedTraits = { ...props.traits, [RealmTraitType.River]: value };
    props.onChange(updatedTraits);
  };

  const hasSelectedFilters =
    props.traits.River > 0 ||
    props.traits.City > 0 ||
    props.traits.Harbor > 0 ||
    props.traits.Region > 0;

  return (
    <Popover className="relative">
      <div ref={ref}>
        <Button
          variant="primary"
          size="sm"
          className={clsx(hasSelectedFilters ? 'bg-black' : '')}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          TRAITS
        </Button>

        {isOpen && (
          <Popover.Panel className="absolute z-10 mt-2 md:right-0" static>
            <div className="flex flex-col px-8 py-4 pb-6 font-medium text-white bg-black rounded-sm shadow-sm w-60">
              <h4 className="text-center">Traits</h4>
              <RangeSliderFilter
                name="Regions"
                min={0}
                max={RegionMax}
                defaultValue={props.traits[RealmTraitType.Region]}
                onChange={onRegionFilterChange}
              />
              <RangeSliderFilter
                name="Cities"
                min={0}
                max={CityMax}
                defaultValue={props.traits[RealmTraitType.City]}
                onChange={onCityFilterChange}
              />
              <RangeSliderFilter
                name="Harbours"
                min={0}
                max={HarbourMax}
                defaultValue={props.traits[RealmTraitType.Harbor]}
                onChange={onHarbourFilterChange}
              />
              <RangeSliderFilter
                name="Rivers"
                min={0}
                max={RiverMax}
                defaultValue={props.traits[RealmTraitType.River]}
                onChange={onRiverFilterChange}
              />
            </div>
          </Popover.Panel>
        )}
      </div>
    </Popover>
  );
}
