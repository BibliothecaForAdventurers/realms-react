import { Button } from '@bibliotheca-dao/ui-lib';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { RealmsMax } from '@/constants/index';
import { RealmTraitType } from '@/generated/graphql';
import { useOnClickOutsideElement } from '@/hooks/useOnClickOutsideElement';
import type { MinMaxRange } from '@/types/index';
import { RangeSliderFilter } from './RangeSliderFilter';

type Traits = {
  [RealmTraitType.Region]: MinMaxRange;
  [RealmTraitType.City]: MinMaxRange;
  [RealmTraitType.Harbor]: MinMaxRange;
  [RealmTraitType.River]: MinMaxRange;
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

  const onRegionFilterChange = (value: number[]) => {
    const updatedTraits = {
      ...props.traits,
      [RealmTraitType.Region]: { min: value[0], max: value[1] },
    };
    props.onChange(updatedTraits);
  };

  const onCityFilterChange = (value: number[]) => {
    const updatedTraits = {
      ...props.traits,
      [RealmTraitType.City]: { min: value[0], max: value[1] },
    };
    props.onChange(updatedTraits);
  };

  const onHarbourFilterChange = (value: number[]) => {
    const updatedTraits = {
      ...props.traits,
      [RealmTraitType.Harbor]: { min: value[0], max: value[1] },
    };
    props.onChange(updatedTraits);
  };

  const onRiverFilterChange = (value: number[]) => {
    const updatedTraits = {
      ...props.traits,
      [RealmTraitType.River]: { min: value[0], max: value[1] },
    };
    props.onChange(updatedTraits);
  };

  const hasSelectedFilters =
    props.traits.River.min > 0 ||
    props.traits.River.max < RealmsMax.River ||
    props.traits.City.min > 0 ||
    props.traits.City.max < RealmsMax.City ||
    props.traits.Harbor.min > 0 ||
    props.traits.Harbor.max < RealmsMax.Harbour ||
    props.traits.Region.min > 0 ||
    props.traits.Region.max < RealmsMax.Region;

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
                max={RealmsMax.Region}
                values={[
                  props.traits[RealmTraitType.Region].min,
                  props.traits[RealmTraitType.Region].max,
                ]}
                defaultValues={[0, RealmsMax.Region]}
                onChange={onRegionFilterChange}
              />
              <RangeSliderFilter
                name="Cities"
                min={0}
                max={RealmsMax.City}
                values={[
                  props.traits[RealmTraitType.City].min,
                  props.traits[RealmTraitType.City].max,
                ]}
                defaultValues={[0, RealmsMax.City]}
                onChange={onCityFilterChange}
              />
              <RangeSliderFilter
                name="Harbours"
                min={0}
                max={RealmsMax.Harbour}
                values={[
                  props.traits[RealmTraitType.Harbor].min,
                  props.traits[RealmTraitType.Harbor].max,
                ]}
                defaultValues={[0, RealmsMax.Harbour]}
                onChange={onHarbourFilterChange}
              />
              <RangeSliderFilter
                name="Rivers"
                min={0}
                max={RealmsMax.River}
                values={[
                  props.traits[RealmTraitType.River].min,
                  props.traits[RealmTraitType.River].max,
                ]}
                defaultValues={[0, RealmsMax.River]}
                onChange={onRiverFilterChange}
              />
            </div>
          </Popover.Panel>
        )}
      </div>
    </Popover>
  );
}
