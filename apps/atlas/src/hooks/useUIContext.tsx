/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useCallback, useContext, useState } from 'react';

import crypts from '../geodata/crypts_all.json';
import ga_bags from '../geodata/ga_bags.json';
import loot_bags from '../geodata/loot_bags.json';
import realms from '../geodata/realms.json';

export type AssetType = 'realm' | 'crypt' | 'loot' | 'ga';

export type MenuType = 'main' | 'empire' | 'resources' | 'orders' | AssetType;

export type AssetFilter = {
  value: AssetType;
  name: string;
  maxId: number;
};

type Coordinate = {
  longitude: number;
  latitude: number;
};

export const AssetFilters: AssetFilter[] = [
  { value: 'realm', name: 'Realm', maxId: 8000 },
  { value: 'crypt', name: 'C&C', maxId: 9000 },
  { value: 'loot', name: 'Loot', maxId: 8000 },
  {
    value: 'ga',
    name: 'GA',
    maxId: Math.max(
      ...ga_bags.features.map((feature) => parseInt(feature.properties.ga_id))
    ),
  },
];

interface UI {
  selectedId: string;
  setSelectedId: (id: string) => void;
  selectedAssetFilter: AssetFilter;
  setSelectedAssetFilter: (AssetFilter: AssetFilter) => void;
  selectedMenuType: MenuType;
  setMenuType: (menuType: MenuType) => void;
  toggleMenuType: (menuType: MenuType) => void;
  closeAll: (exclude?: MenuType) => void;
  gotoAssetId: (assetId: string | number, assetType: AssetType) => void;
  coordinates?: Coordinate;
}

const defaultUIContext: UI = {
  selectedId: '1',
  setSelectedId: (id: string) => {},
  selectedAssetFilter: AssetFilters[0],
  setSelectedAssetFilter: (AssetFilter: AssetFilter) => {},
  selectedMenuType: 'main',
  setMenuType: (menuType: MenuType) => {},
  toggleMenuType: (menuType: MenuType) => {},
  closeAll: (exclude?: MenuType) => {},
  gotoAssetId: (assetId: string | number, assetType: AssetType) => {},
};

const UIContext = createContext<UI>(defaultUIContext);

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider = (props: UIProviderProps) => {
  return (
    <UIContext.Provider value={useUI()}>{props.children}</UIContext.Provider>
  );
};

function useUI(): UI {
  const [selectedId, setSelectedId] = useState('1');
  const [selectedAssetFilter, setSelectedAssetFilter] = useState(
    AssetFilters[0]
  );
  const [selectedMenuType, setMenuType] = useState<MenuType>('main');
  const [coordinates, setCoordinates] = useState<Coordinate>();

  const getAssetById = useCallback(
    (assetId: string, assetType: AssetType) => {
      let asset;
      switch (assetType) {
        case 'realm':
          asset = realms.features.filter(
            (a: any) => a.properties.realm_idx === parseInt(assetId)
          );
          break;
        case 'crypt':
          asset = crypts.features.filter(
            (a: any) => a.properties.tokenId === parseInt(assetId)
          );
          break;
        case 'loot':
          asset = loot_bags.features.filter(
            (a: any) => a.properties.bag_id === parseInt(assetId)
          );
          break;
        case 'ga':
          asset = ga_bags.features.filter(
            (a: any) => parseInt(a.properties.ga_id) === parseInt(assetId)
          );
          break;
      }
      return asset;
    },
    [selectedId, selectedAssetFilter]
  );

  const closeAll = (exclude?: MenuType) => {
    if (!exclude) {
      setMenuType('main');
    } else if (selectedMenuType !== exclude) {
      setMenuType(exclude);
    }
  };

  const toggleMenuType = (menuType: MenuType) => {
    if (selectedMenuType === menuType) {
      setMenuType('main');
    } else {
      setMenuType(menuType);
    }
  };

  const gotoAssetId = (assetId: string | number, assetType: AssetType) => {
    setMenuType(assetType);
    setSelectedAssetFilter(
      AssetFilters.find(
        (assetFilter) => assetFilter.value === assetType
      ) as AssetFilter
    );
    setSelectedId(assetId + '');
    const asset = getAssetById(assetId + '', assetType);
    if (asset && asset[0]) {
      setCoordinates({
        longitude: asset[0].geometry.coordinates[0],
        latitude: asset[0].geometry.coordinates[1],
      });
    }
  };

  return {
    selectedId,
    setSelectedId,
    selectedAssetFilter,
    setSelectedAssetFilter,
    selectedMenuType,
    setMenuType,
    closeAll,
    toggleMenuType,
    gotoAssetId,
    coordinates,
  };
}

export function useUIContext() {
  return useContext(UIContext);
}
