import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import Adamantine from '../../icons/resources/Adamantine.svg';
import AlchemicalSilver from '../../icons/resources/AlchemicalSilver.svg';
import Cloth from '../../icons/resources/Cloth.svg';
import Coal from '../../icons/resources/Coal.svg';
import ColdIron from '../../icons/resources/ColdIron.svg';
import Copper from '../../icons/resources/Copper.svg';
import DeepCrystal from '../../icons/resources/DeepCrystal.svg';
import DemonHide from '../../icons/resources/DemonHide.svg';
import DesertGlass from '../../icons/resources/DesertGlass.svg';
import Diamonds from '../../icons/resources/Diamonds.svg';
import Dragonhide from '../../icons/resources/Dragonhide.svg';
import EtherealSilica from '../../icons/resources/EtherealSilica.svg';
import Gold from '../../icons/resources/Gold.svg';
import Hartwood from '../../icons/resources/Hartwood.svg';
import Ignium from '../../icons/resources/Ignium.svg';
import Ironwood from '../../icons/resources/Ironwood.svg';
import Mithral from '../../icons/resources/Mithral.svg';
import Obsidian from '../../icons/resources/Obsidian.svg';
import Ore from '../../icons/resources/Ore.svg';
import Ruby from '../../icons/resources/Ruby.svg';
import Sapphire from '../../icons/resources/Sapphire.svg';
import Shekels from '../../icons/resources/Shekels.svg';
import Silver from '../../icons/resources/Silver.svg';
import Spores from '../../icons/resources/Spores.svg';
import Stone from '../../icons/resources/Stone.svg';
import TrueIce from '../../icons/resources/TrueIce.svg';
import TwilightQuartz from '../../icons/resources/TwilightQuartz.svg';
import Wood from '../../icons/resources/Wood.svg';

export type Props = {
  resource: string;
  size: keyof typeof STYLES['size'];
  className?: string;
  label?: boolean;
};

type Resource = {
  component: ReactElement;
  name: string;
};

const Components: { [key: string]: Resource } = Object.freeze({
  Adamantine: { component: <Adamantine />, name: 'Adamantine' },
  AlchemicalSilver: {
    component: <AlchemicalSilver />,
    name: 'Alchemical Silver',
  },
  Coal: { component: <Coal />, name: 'Coal' },
  ColdIron: { component: <ColdIron />, name: 'Cold Iron' },
  Copper: { component: <Copper />, name: 'Copper' },
  DeepCrystal: { component: <DeepCrystal />, name: 'Deep Crystal' },
  Diamonds: { component: <Diamonds />, name: 'Diamonds' },
  Dragonhide: { component: <Dragonhide />, name: 'Dragonhide' },
  EtherealSilica: { component: <EtherealSilica />, name: 'Ethereal Silica' },
  Gold: { component: <Gold />, name: 'Gold' },
  Hartwood: { component: <Hartwood />, name: 'Hartwood' },
  Ignium: { component: <Ignium />, name: 'Ignium' },
  Ironwood: { component: <Ironwood />, name: 'Ironwood' },
  Mithral: { component: <Mithral />, name: 'Mithral' },
  Obsidian: { component: <Obsidian />, name: 'Obsidian' },
  Ruby: { component: <Ruby />, name: 'Ruby' },
  Sapphire: { component: <Sapphire />, name: 'Sapphire' },
  Silver: { component: <Silver />, name: 'Silver' },
  Stone: { component: <Stone />, name: 'Stone' },
  TrueIce: { component: <TrueIce />, name: 'TrueIce' },
  TwilightQuartz: { component: <TwilightQuartz />, name: 'Twilight Quartz' },
  Wood: { component: <Wood />, name: 'Wood' },
  EmbersGlow: { component: <DemonHide />, name: 'Demon Hide' },
  StoneTemple: { component: <Cloth />, name: 'Cloth' },
  DesertOasis: { component: <DesertGlass />, name: 'Desert Glass' },
  MountainDeep: { component: <Ore />, name: 'Ore' },
  UnderwaterKeep: { component: <Shekels />, name: 'Shekels' },
  ForestRuins: { component: <Spores />, name: 'Spores' },
});

const STYLES = {
  size: {
    xs: 'w-4',
    sm: 'w-6',
    md: 'w-8',
    lg: 'w-12',
  },
} as const;

export const ResourceIcon = (props: Props) => {
  return (
    <div className={`flex`}>
      <span className={`${twMerge(STYLES.size[props.size], props.className)} `}>
        {
          Components[props.resource.replace(' ', '').replace("'", '')]
            ?.component
        }
      </span>

      {props.label && (
        <span className="mt-4 font-semibold tracking-widest uppercase font-body">
          {Components[props.resource.replace(' ', '').replace("'", '')]?.name}
        </span>
      )}
    </div>
  );
};
