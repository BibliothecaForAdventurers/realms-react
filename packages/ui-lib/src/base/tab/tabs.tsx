import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';
import type { ReactNode, SyntheticEvent } from 'react';
import { Tab } from './tab';
import { TabList } from './tab-list';
import { TabPanel } from './tab-panel';
import { TabPanels } from './tab-panels';
import { TabProvider } from './tab-provider';

export const VARIANTS = {
  default: {
    tab: {
      base: ' relative inline-flex items-center px-2 sm:px-4 py-1 text-sm font-semibold md:text-md font-body uppercase tracking-widest transition-all duration-150  rounded hover:bg-black/10  hover:shadow text-gray-700',
      active:
        ' focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-white ring-opacity-20 text-white bg-black/20 shadow',
      inactive: 'text-white border-transparent',
    },
    tabList:
      'flex space-x-3 sm:space-x-4 bg-black/10 p-2 rounded mb-2 mt-4 shadow-inner ',
  },
  primary: {
    tab: {
      base: 'relative flex w-full items-center justify-center px-4 py-2 font-body  uppercase tracking-widest hover:bg-gray-600 hover:shadow-md transition-all duration-150 hover:text-white rounded   hover:bg-stone-400/80 focus-visible:ring-yellow-700 border-off-200',
      active: 'bg-stone-500  shadow-md text-white border',
      inactive: 'bg-transparent text-gray-200',
    },
    tabList: 'flex py-3 space-x-2',
  },
};

export interface TabsProps {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
  selectedIndex?: number;
  onChange?: (index: number | SyntheticEvent) => void;
}

export const Tabs = ({
  children,
  className,
  variant = 'default',
  selectedIndex = 0,
  onChange,
}: TabsProps) => {
  return (
    <TabProvider variant={variant}>
      {onChange ? (
        <HeadlessTab.Group
          as="div"
          className={clsx('flex flex-1 flex-col ', className)}
          selectedIndex={selectedIndex}
          onChange={onChange}
        >
          {children}
        </HeadlessTab.Group>
      ) : (
        <HeadlessTab.Group
          as="div"
          className={clsx('flex flex-1 flex-col ', className)}
        >
          {children}
        </HeadlessTab.Group>
      )}
    </TabProvider>
  );
};

Tabs.List = TabList;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
Tabs.Tab = Tab;
