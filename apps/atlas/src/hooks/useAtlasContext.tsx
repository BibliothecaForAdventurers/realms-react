/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { BackgroundOptions } from '@/components/map/ArtBackground';
import { useBreakpoint } from '@/hooks/useBreakPoint';

import crypts from '../geodata/crypts_all.json';
import ga_bags from '../geodata/ga_bags.json';
import loot_bags from '../geodata/loot_bags.json';
import realms from '../geodata/realms.json';
export type AssetType = 'realm' | 'crypt' | 'loot' | 'ga' | undefined;

export type PanelType =
  | 'account'
  | 'trade'
  | 'bank'
  | 'lore'
  | 'combat'
  | AssetType;

export type MenuType =
  | 'settleRealms'
  | 'bridgeRealms'
  | 'resourceSwap'
  | 'transactionCart'
  | 'military'
  | PanelType;

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

export type ModalType = {
  type: 'lore-entity' | 'raid-result';
  props?: object;
} | null;

interface Atlas {
  selectedId: string;
  setSelectedId: (id: string) => void;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  selectedAssetFilter: AssetFilter;
  setSelectedAssetType: (assetType: AssetType) => void;
  selectedMenuType: MenuType;
  setMenuType: (menuType: MenuType) => void;
  toggleMenuType: (menuType: MenuType) => void;
  openDetails: (menuType: MenuType, assetId: string) => void;
  closeAll: (exclude?: MenuType) => void;
  gotoAssetId: (assetId: string | number, assetType: AssetType) => void;
  coordinates?: Coordinate;
  toggleArtBackground: (background?: BackgroundOptions) => void;
  artBackground: BackgroundOptions;
  mainMenu: boolean;
  toggleMainMenu: () => void;
  togglePanelType: (panelType: PanelType) => void;
  selectedPanel: PanelType;
  isDisplayLarge: boolean;
  selectedModal: ModalType;
  setModal: (ModalType) => void;
}

const AtlasContext = createContext<Atlas>(null!);

interface AtlasProviderProps {
  children: React.ReactNode;
}

const assetFilterByType = (assetType: AssetType) =>
  AssetFilters.find(
    (assetFilter) => assetFilter.value === assetType
  ) as AssetFilter;

export const AtlasProvider = (props: AtlasProviderProps) => {
  return (
    <AtlasContext.Provider value={useAtlas()}>
      {props.children}
    </AtlasContext.Provider>
  );
};

function useCoordinates() {
  const [coordinates, setCoordinates] = useState<Coordinate>();
  const getAssetById = useCallback((assetId: string, assetType: AssetType) => {
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
  }, []);

  function updateCoordinatesByAsset(assetId: string, assetType: AssetType) {
    const asset = getAssetById(assetId + '', assetType);
    if (asset && asset[0]) {
      setCoordinates({
        longitude: asset[0].geometry.coordinates[0],
        latitude: asset[0].geometry.coordinates[1],
      });
    }
  }
  return {
    coordinates,
    updateCoordinatesByAsset,
  };
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function useAtlas(): Atlas {
  const router = useRouter();
  // const poiQuery = useQueryPOI();
  const [selectedId, setSelectedId] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAssetFilter, setSelectedAssetFilter] = useState(
    AssetFilters[0]
  );
  const breakpoints: any = useBreakpoint();

  const isDisplayLarge = breakpoints.md;

  const [artBackground, setArtBackground] = useState<BackgroundOptions>();
  const [mainMenu, setMainMenu] = useState(
    // default closed on small screens
    isDisplayLarge
  );

  const [selectedMenuType, setMenuType] = useState<MenuType>(undefined);
  const [selectedPanel, setPanelType] = useState<PanelType>(undefined);
  const { coordinates, updateCoordinatesByAsset } = useCoordinates();
  const [selectedModal, setSelectedModal] = useState<ModalType>(null);

  useEffect(() => {
    const panel = router.query.segment && router.query.segment[0];
    const id = router.query?.id as string;

    if (selectedPanel !== panel) {
      setShowDetails(true);
      togglePanelType((panel || selectedPanel) as PanelType);
    }

    if (id) {
      setShowDetails(true);
      setSelectedAssetFilter(assetFilterByType(panel as AssetType));
      setSelectedId(id);
    }
  }, [router.query]);

  const closeAll = (exclude?: MenuType) => {
    if (!exclude) {
      setShowDetails(false);
      setMenuType(undefined);
    } else if (selectedMenuType !== exclude) {
      setMenuType(exclude);
    }
  };
  const toggleArtBackground = (background?: BackgroundOptions) => {
    setArtBackground(background);
  };

  const toggleMenuType = (menuType: MenuType) => {
    if (selectedMenuType === menuType) {
      setShowDetails(false);
      setMenuType(undefined);
    } else {
      setShowDetails(true);
      setMenuType(menuType);
    }
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const togglePanelType = (panelType: PanelType) => {
    setMainMenu(false);
    if (selectedPanel === panelType) {
      setPanelType(undefined);
      setMenuType(undefined);
      setArtBackground(undefined);
    } else {
      setPanelType(panelType);
      if (panelType === 'crypt') {
        setArtBackground('crypt');
        if (breakpoints.lg) {
          setMenuType(panelType);
        }
      } else if (panelType === 'bank') {
        setArtBackground('bank');
        if (breakpoints.lg) {
          openDetails('resourceSwap', '1');
        }
      } else if (panelType === 'trade' || panelType === 'combat') {
        setArtBackground('realm');
        if (breakpoints.lg) {
          setMenuType(panelType);
        }
      } else if (panelType === 'lore') {
        setArtBackground('bank');
        if (breakpoints.lg) {
          setMenuType(panelType);
        }
      } else {
        setArtBackground('hero');
        if (breakpoints.lg) {
          setMenuType(panelType);
        }
      }
    }
  };

  const openDetails = (menuType: MenuType, assetId: string) => {
    let panel = menuType;
    switch (panel) {
      case 'settleRealms':
      case 'bridgeRealms':
        panel = 'realm';
        break;
      case 'resourceSwap':
        panel = 'bank';
        break;
      case 'military':
        break;
      case 'transactionCart':
    }

    router.push(`/${panel}?id=${assetId}`, undefined, {
      shallow: true,
    });
  };

  const setSelectedAssetType = (assetType: AssetType) =>
    setSelectedAssetFilter(assetFilterByType(assetType));

  const toggleMainMenu = () => {
    return setMainMenu(!mainMenu);
  };

  const gotoAssetId = (assetId: string | number, assetType: AssetType) => {
    setMenuType(assetType);
    setShowDetails(true);
    setSelectedAssetType(assetType);
    setSelectedId(assetId + '');
    updateCoordinatesByAsset(assetId + '', assetType);
  };

  const setModal = (args: ModalType) => {
    if (args === null) {
      setSelectedModal(null);
    } else {
      setSelectedModal(args);
    }
  };

  return {
    selectedId,
    setSelectedId,
    showDetails,
    setShowDetails,
    selectedAssetFilter,
    setSelectedAssetType,
    selectedMenuType,
    setMenuType,
    openDetails,
    closeAll,
    toggleArtBackground,
    toggleMenuType,
    gotoAssetId,
    coordinates,
    artBackground,
    mainMenu,
    toggleMainMenu,
    togglePanelType,
    selectedPanel,
    isDisplayLarge,
    selectedModal,
    setModal,
  };
}

export function useAtlasContext() {
  return useContext(AtlasContext);
}
