import type { ReactElement } from 'react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Anger from '../../icons/orders/anger.svg';
import Brilliance from '../../icons/orders/brilliance.svg';
import Detection from '../../icons/orders/detection.svg';
import Enlightenment from '../../icons/orders/enlightenment.svg';
import Fox from '../../icons/orders/fox.svg';
import Fury from '../../icons/orders/fury.svg';
import Giants from '../../icons/orders/giants.svg';
import Perfection from '../../icons/orders/perfection.svg';
import Power from '../../icons/orders/power.svg';
import Protection from '../../icons/orders/protection.svg';
import Rage from '../../icons/orders/rage.svg';
import Reflection from '../../icons/orders/reflection.svg';
import Skill from '../../icons/orders/skill.svg';
import Titans from '../../icons/orders/titans.svg';
import Twins from '../../icons/orders/twins.svg';
import Vitriol from '../../icons/orders/vitriol.svg';

export type Props = {
  order: string;
  size: keyof typeof STYLES['size'];
  className?: string;
  withTooltip?: boolean;
};

const Components: { [key: string]: ReactElement } = Object.freeze({
  power: <Power className="stroke-8 stroke-order-power" />,
  anger: <Anger />,
  brilliance: <Brilliance />,
  detection: <Detection />,
  enlightenment: <Enlightenment />,
  'the fox': <Fox className="stroke-8 stroke-order-fox" />,
  fury: <Fury />,
  giants: <Giants />,
  perfection: <Perfection className=" fill-order-perfection" />,
  reflection: <Reflection />,
  skill: <Skill />,
  titans: <Titans />,
  'the twins': <Twins />,
  vitriol: <Vitriol />,
  rage: <Rage />,
  protection: <Protection />,
});

const STYLES = {
  size: {
    xs: 'w-4 h-4 my-4 flex justify-center',
    sm: 'w-6 h-6 my-4 flex justify-center',
    md: 'w-8 h-8 my-4 flex justify-center',
    lg: 'w-12 h-12 my-4 flex justify-center',
  },
} as const;

export const OrderIcon = (props: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-center group">
      <div className={twMerge(STYLES.size[props.size], props.className)}>
        {Components[props.order.replace('_', ' ')]}
      </div>
      {props.withTooltip && (
        <div className="absolute top-0 flex flex-col items-center hidden -translate-y-full w-max group-hover:flex">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
            Order of {props.order.includes('the') && 'the '}
            <span className="capitalize">
              {props.order.replace('the ', '')}
            </span>
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
        </div>
      )}
    </div>
  );
};
