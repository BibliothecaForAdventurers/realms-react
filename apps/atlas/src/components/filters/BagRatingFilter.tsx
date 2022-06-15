import { Button } from '@bibliotheca-dao/ui-lib';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { LootMax } from '@/constants/index';
import { useOnClickOutsideElement } from '@/hooks/useOnClickOutsideElement';
import type { MinMaxRange } from '@/types/index';
import { RangeSliderFilter } from './RangeSliderFilter';

type BagRating = {
  bagRating: MinMaxRange;
  bagGreatness: MinMaxRange;
};

type BagRatingFilterProps = {
  rating: BagRating;
  onChange(rating: BagRating): void;
};

export function BagRatingFilter(props: BagRatingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useOnClickOutsideElement(ref, () => {
    setIsOpen(false);
  });

  const onGreatnessFilterChange = (value: number[]) => {
    const updatedRating = {
      ...props.rating,
      bagGreatness: { min: value[0], max: value[1] },
    };
    props.onChange(updatedRating);
  };

  const onRatingFilterChange = (value: number[]) => {
    const updatedRating = {
      ...props.rating,
      bagRating: { min: value[0], max: value[1] },
    };
    props.onChange(updatedRating);
  };

  const hasSelectedFilters =
    props.rating.bagRating.min > 0 ||
    props.rating.bagRating.max < LootMax.Rating ||
    props.rating.bagGreatness.min > 0 ||
    props.rating.bagGreatness.max < LootMax.Greatness;

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
          Rating
        </Button>

        {isOpen && (
          <Popover.Panel
            className="absolute z-10 m-auto mt-2 md:right-0"
            static
          >
            <div className="flex flex-col gap-6 px-8 py-4 pb-10 font-medium text-white bg-black rounded shadow-sm w-60">
              <div className="text-lg text-center uppercase">Rating</div>
              <RangeSliderFilter
                name="Greatness"
                min={0}
                max={LootMax.Greatness}
                defaultValues={[0, LootMax.Greatness]}
                values={[
                  props.rating.bagGreatness.min,
                  props.rating.bagGreatness.max,
                ]}
                onChange={onGreatnessFilterChange}
              />
              <RangeSliderFilter
                name="Rating"
                min={0}
                max={LootMax.Rating}
                defaultValues={[0, LootMax.Rating]}
                values={[
                  props.rating.bagRating.min,
                  props.rating.bagRating.max,
                ]}
                onChange={onRatingFilterChange}
              />
            </div>
          </Popover.Panel>
        )}
      </div>
    </Popover>
  );
}
