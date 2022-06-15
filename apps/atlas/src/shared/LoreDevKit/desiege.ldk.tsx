/* eslint-disable react/jsx-key */
import {
  Anger,
  Brilliance,
  Detection,
  Enlightenment,
  Fox,
  Fury,
  Giants,
  Perfection,
  Power,
  Protection,
  Rage,
  Reflection,
  Skill,
  Titans,
  Twins,
  Vitriol,
} from '@bibliotheca-dao/ui-lib/icons/orders';

import classNames from 'classnames';
import type { LDKSchema } from './lib';

const LoreLink = (props: { children: any; href: string }) => (
  <>
    <a
      target={'_blank'}
      rel="noreferrer nofollow"
      href={props.href}
      className="underline hover:text-gray-400"
    >
      {props.children}
    </a>
  </>
);

const OrderIcon = (props: {
  className?: string;
  order: string;
  style?: HTMLStyleElement;
}) => {
  const iconClassName = 'h-4 w-4 inline-block -mr-1';

  switch (props.order) {
    case 'anger':
      return <Anger className={classNames(iconClassName, props.className)} />;
    case 'brilliance':
      return (
        <Brilliance className={classNames(iconClassName, props.className)} />
      );
    case 'detection':
      return (
        <Detection className={classNames(iconClassName, props.className)} />
      );
    case 'enlightenment':
      return (
        <Enlightenment className={classNames(iconClassName, props.className)} />
      );
    case 'fox':
      return <Fox className={classNames(iconClassName, props.className)} />;
    case 'fury':
      return <Fury className={classNames(iconClassName, props.className)} />;
    case 'giants':
      return <Giants className={classNames(iconClassName, props.className)} />;
    case 'perfection':
      return (
        <Perfection className={classNames(iconClassName, props.className)} />
      );
    case 'power':
      return <Power className={classNames(iconClassName, props.className)} />;
    case 'protection':
      return (
        <Protection className={classNames(iconClassName, props.className)} />
      );
    case 'rage':
      return <Rage className={classNames(iconClassName, props.className)} />;
    case 'reflection':
      return (
        <Reflection className={classNames(iconClassName, props.className)} />
      );
    case 'skill':
      return <Skill className={classNames(iconClassName, props.className)} />;
    case 'titans':
      return <Titans className={classNames(iconClassName, props.className)} />;
    case 'twins':
      return <Twins className={classNames(iconClassName, props.className)} />;
    case 'vitriol':
      return <Vitriol className={classNames(iconClassName, props.className)} />;
    default:
      return null;
  }
};

const divineSiege: LDKSchema = {
  root: {
    nodeType: 'root-contract',
    contractAddress: '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7',
    name: 'Lootverse',
  },
  layers: [
    {
      title: 'The Loot Contract',
      descriptions: [
        'Divine items exist in the OG Loot bags and are established as the highest Level items of each of their respective classes.',
        'The Loot contract provides 16 Orders, in a non-alphabetical but seemingly-intentional structure.',
      ],
    },
    {
      title: 'Implications of the Loot Contract',
      descriptions: [
        'Of the 16 Orders, their meaning can be divided into two polarities: Light and Dark.',
        <p>
          It is clear in how the orders were listed in proximity to each other,
          split into exactly two halves, that this{' '}
          <LoreLink href="https://docs.loot.foundation/canonical-principles/loot/the-16-orders">
            classification is by creator design
          </LoreLink>
          .
        </p>,
      ],
    },
    {
      title: 'Loot Community Canon and Lore',
      descriptions: [
        'There exists a Divine City hovering over the Origin Oasis, in the Realm of Nronmrámhríh, ascended into the clouds by a Council of Mages harnessing the power of Divine energy from the Loot items.',
        'Portals exist in the Lootverse, like the Divine Portal and other wonders.',
        'The Council of Mages are extremely wise and powerful, and are in charge of city defences.',
      ],
    },
    {
      title: 'Divine Eclipse',
      descriptions: [
        'It is a period of chaos across the Realms. A handful of totalitarian factions are attempting to consolidate power.',
        'Amidst the war and destruction, a secret society called The Divine Order\
         began to assemble in the Divine City, determined to safeguard the artifacts, \
         treasures, and sacred texts of the Lootverse and preserve the ancient history. \
         They locked the gates and erected a shield powered by Divine Energy.',
        'As the Realms burned, the Mages of the Divine Order harnessed the power of DIVINE magic \
         to ascend the Divine City into the clouds, preparing for the inevitable siege to come.',
        <p>
          Now, floating above Nronmrámhríh, the Origin Oasis, the Divine City
          shimmers with ancient magic and power. To some, it is a beacon of hope
          for a unified Lootverse, united by the power of Divine magic. To
          others, its existence is an affront to a free society and its
          treasures must be restored to their rightful Orders.
        </p>,
        <p>
          Inside: Adventurers of the Light, determined to support and defend the
          City.
        </p>,
        <p>
          Armed with <OrderIcon order="power" /> Power,{' '}
          <OrderIcon order="skill" /> Skill, and{' '}
          <OrderIcon order="brilliance" /> Brilliance, backed by an army of{' '}
          <OrderIcon order="giants" /> Giants and <OrderIcon order="titans" />{' '}
          Titans, driven by a need for <OrderIcon order="perfection" />{' '}
          Perfection, the Adventurers of the Light band together on a mission of{' '}
          <OrderIcon order="protection" className="opacity-40" /> Protection.
        </p>,
        <p>
          Outside: Adventurers of the Dark, ready to lay siege to the Divine
          City and claim the treasures within.
        </p>,
        <p>
          Fueled by <OrderIcon order="anger" /> Anger,{' '}
          <OrderIcon order="rage" /> Rage, <OrderIcon order="fury" /> Fury and{' '}
          <OrderIcon order="vitriol" /> Vitriol, with the power of the{' '}
          <OrderIcon order="twins" /> Twins and the <OrderIcon order="fox" />{' '}
          Fox at their side, channeling the dark magic of{' '}
          <OrderIcon order="reflection" /> Reflection and{' '}
          <OrderIcon order="detection" /> Detection, the Adventurers of the Dark
          work together to lay siege to the City and restore the treasures to
          their rightful place across the Realms.
        </p>,
      ],
    },
    {
      title: 'The Dark Portal',
      end: true,
      descriptions: [
        'What is the source of the Dark portals power?',
        'What or who is on the originating side of the Dark Portal?',
        'Why did it open?',
      ],
    },
  ],
};

export default divineSiege;
