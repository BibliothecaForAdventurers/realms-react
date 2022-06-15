import { Button } from '@bibliotheca-dao/ui-lib';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { RealmsMax } from '@/constants/index';
import { useOnClickOutsideElement } from '@/hooks/useOnClickOutsideElement';
import type { MinMaxRange } from '@/types/index';
import { RangeSliderFilter } from './RangeSliderFilter';

type RealmsRarity = {
  score: MinMaxRange;
  rank: MinMaxRange;
};

type RealmsRarityFilterProps = {
  rarity: RealmsRarity;
  onChange(rarity: RealmsRarity): void;
};

export function RealmsRarityFilter(props: RealmsRarityFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { rarity } = props;

  const ref = useRef(null);
  useOnClickOutsideElement(ref, () => {
    setIsOpen(false);
  });

  const onScoreFilterChange = (value: number[]) => {
    const updatedRarity = {
      ...props.rarity,
      score: { min: value[0], max: value[1] },
    };
    props.onChange(updatedRarity);
  };

  const onRankFilterChange = (value: number[]) => {
    const updatedRarity = {
      ...props.rarity,
      rank: { min: value[0], max: value[1] },
    };
    props.onChange(updatedRarity);
  };

  const hasSelectedFilters =
    props.rarity.rank.min > 0 ||
    props.rarity.rank.max < RealmsMax.Rank ||
    props.rarity.score.min > 0 ||
    props.rarity.score.max < RealmsMax.Score;

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
          Rarity
        </Button>

        {isOpen && (
          <Popover.Panel
            className="absolute z-10 mt-2 ml-2 sm:translate-x-0 sm:left-0 md:-translate-x-1/2 md:left-1/2"
            static
          >
            <div className="flex flex-col px-8 py-4 pb-10 font-medium text-white bg-black rounded shadow-sm w-60">
              <h4 className="text-center">Rarity</h4>
              <RangeSliderFilter
                name="Score"
                min={0}
                max={RealmsMax.Score}
                stepSize={50}
                values={[rarity.score.min, rarity.score.max]}
                defaultValues={[0, RealmsMax.Score]}
                onChange={onScoreFilterChange}
              />
              <RangeSliderFilter
                name="Rank"
                min={0}
                max={RealmsMax.Rank}
                stepSize={50}
                values={[rarity.rank.min, rarity.rank.max]}
                defaultValues={[0, RealmsMax.Rank]}
                onChange={onRankFilterChange}
              />
            </div>
          </Popover.Panel>
        )}
      </div>
    </Popover>
  );
}
