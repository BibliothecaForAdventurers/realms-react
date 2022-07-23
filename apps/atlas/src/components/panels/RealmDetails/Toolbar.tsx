import clsx from 'clsx';
import React from 'react';
import type { Subview } from '@/hooks/settling/useRealmDetailHotkeys';

type ToolbarItemProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  onClick: () => void;
};

const ToolbarItem = (props: ToolbarItemProps) => {
  return (
    <div>
      <button onClick={props.onClick} className="text-xs">
        {props.title}
      </button>{' '}
      {props.children}
    </div>
  );
};

type ToolbarProps = {
  className?: string;
  onSetSubview: (string: Subview) => void;
};

const RealmToolbar: React.FC<ToolbarProps> = (props) => {
  return (
    <div
      className={clsx(
        props.className,
        'w-full flex justify-around bg-slate-700 p-4 gap-2'
      )}
    >
      <ToolbarItem
        onClick={() => props.onSetSubview('Statistics')}
        title="Statistics"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Harvests')}
        title="Harvests"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Food')}
        title="Food"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Buildings')}
        title="Buildings"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Vault')}
        title="Vault"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Raid')}
        title="Raids"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Goblins')}
        title="Goblins"
      ></ToolbarItem>
      <ToolbarItem
        onClick={() => props.onSetSubview('Lore')}
        title="Lore"
      ></ToolbarItem>
    </div>
  );
};

export default RealmToolbar;
