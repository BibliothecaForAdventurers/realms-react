import type { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';
import { RealmsMax } from '@/constants/index';
import type { OrderType } from '@/generated/graphql';
import { RealmTraitType } from '@/generated/graphql';
import { storage } from '@/util/localStorage';
import type { MinMaxRange } from '../types';
const RealmFavoriteLocalStorageKey = 'realm.favourites';

type RarityFilter = {
  score: MinMaxRange;
  rank: MinMaxRange;
};

type TraitsFilter = {
  [RealmTraitType.Region]: MinMaxRange;
  [RealmTraitType.City]: MinMaxRange;
  [RealmTraitType.Harbor]: MinMaxRange;
  [RealmTraitType.River]: MinMaxRange;
};

interface RealmState {
  rarityFilter: RarityFilter;
  traitsFilter: TraitsFilter;
  selectedOrders: OrderType[];
  selectedResources: number[];
  favouriteRealms: number[];
  searchIdFilter: string;
  selectedTab: number;
  hasWonderFilter: boolean;
  isSettledFilter: boolean;
  selectedRealms: number[];
}

type RealmAction =
  | { type: 'updateRarityFilter'; payload: RarityFilter }
  | { type: 'updateTraitsFilter'; payload: TraitsFilter }
  | { type: 'updateSelectedOrders'; payload: OrderType[] }
  | { type: 'updateSelectedResources'; payload: number[] }
  | { type: 'toggleHasWonderFilter' }
  | { type: 'toggleIsSettledFilter' }
  | { type: 'clearFilfters' }
  | { type: 'addFavouriteRealm'; payload: number }
  | { type: 'removeFavouriteRealm'; payload: number }
  | { type: 'updateSearchIdFilter'; payload: string }
  | { type: 'updateSelectedTab'; payload: number }
  | { type: 'toggleRealmSelection'; payload: number }
  | { type: 'toggleSelectAllRealms'; payload: number[] };

interface RealmActions {
  updateRarityFilter(filter: RarityFilter): void;
  updateTraitsFilter(filter: TraitsFilter): void;
  updateSelectedOrders(orders: OrderType[]): void;
  updateSelectedResources(resources: number[]): void;
  toggleHasWonderFilter(): void;
  toggleIsSettledFilter(): void;
  clearFilters(): void;
  addFavouriteRealm(realmId: number): void;
  removeFavouriteRealm(realmId: number): void;
  updateSearchIdFilter(realmId: string): void;
  updateSelectedTab(tab: number): void;
  toggleRealmSelection(realmId: number): void;
  toggleSelectAllRealms(realmIds: number[]): void;
}

const defaultFilters = {
  rarityFilter: {
    score: {
      min: 0,
      max: RealmsMax.Score,
    },
    rank: {
      min: 0,
      max: RealmsMax.Rank,
    },
  },
  traitsFilter: {
    [RealmTraitType.Region]: { min: 0, max: RealmsMax.Region },
    [RealmTraitType.City]: { min: 0, max: RealmsMax.City },
    [RealmTraitType.Harbor]: { min: 0, max: RealmsMax.Harbour },
    [RealmTraitType.River]: { min: 0, max: RealmsMax.River },
  },
  selectedOrders: [] as OrderType[],
  selectedResources: [] as number[],
  searchIdFilter: '',
  hasWonderFilter: false,
  isSettledFilter: false,
};

const defaultRealmState = {
  ...defaultFilters,
  favouriteRealms: [] as number[],
  selectedRealms: [] as number[],
  selectedTab: 1,
};

function realmReducer(state: RealmState, action: RealmAction): RealmState {
  switch (action.type) {
    case 'updateRarityFilter':
      return { ...state, rarityFilter: action.payload };
    case 'updateSearchIdFilter':
      return { ...state, searchIdFilter: action.payload };
    case 'updateTraitsFilter':
      return { ...state, traitsFilter: action.payload };
    case 'updateSelectedTab':
      return { ...state, selectedTab: action.payload };
    case 'toggleHasWonderFilter':
      return { ...state, hasWonderFilter: !state.hasWonderFilter };
    case 'toggleIsSettledFilter':
      return { ...state, isSettledFilter: !state.isSettledFilter };
    case 'updateSelectedOrders':
      return { ...state, selectedOrders: [...action.payload] };
    case 'updateSelectedResources':
      return { ...state, selectedResources: [...action.payload] };
    case 'clearFilfters':
      return { ...state, ...defaultFilters };
    case 'addFavouriteRealm':
      storage<number[]>(RealmFavoriteLocalStorageKey, []).set([
        ...state.favouriteRealms,
        action.payload,
      ]);
      return {
        ...state,
        favouriteRealms: [...state.favouriteRealms, action.payload],
      };
    case 'removeFavouriteRealm':
      storage<number[]>(RealmFavoriteLocalStorageKey, []).set(
        state.favouriteRealms.filter(
          (realmId: number) => realmId !== action.payload
        )
      );
      return {
        ...state,
        favouriteRealms: state.favouriteRealms.filter(
          (realmId: number) => realmId !== action.payload
        ),
      };
    case 'toggleRealmSelection':
      return {
        ...state,
        selectedRealms:
          state.selectedRealms.indexOf(action.payload) > -1
            ? state.selectedRealms.filter((x) => x !== action.payload)
            : [...state.selectedRealms, action.payload],
      };
    case 'toggleSelectAllRealms':
      return {
        ...state,
        selectedRealms: state.selectedRealms.length > 0 ? [] : action.payload,
      };
    default:
      return state;
  }
}

// Actions
const mapActions = (dispatch: Dispatch<RealmAction>): RealmActions => ({
  updateRarityFilter: (filter: RarityFilter) =>
    dispatch({
      type: 'updateRarityFilter',
      payload: filter,
    }),
  updateSearchIdFilter: (realmId: string) =>
    dispatch({ type: 'updateSearchIdFilter', payload: realmId }),
  updateSelectedTab: (tab: number) =>
    dispatch({ type: 'updateSelectedTab', payload: tab }),
  toggleHasWonderFilter: () => dispatch({ type: 'toggleHasWonderFilter' }),
  toggleIsSettledFilter: () => dispatch({ type: 'toggleIsSettledFilter' }),
  updateTraitsFilter: (filter: TraitsFilter) =>
    dispatch({ type: 'updateTraitsFilter', payload: filter }),
  updateSelectedOrders: (orders: OrderType[]) =>
    dispatch({ type: 'updateSelectedOrders', payload: orders }),
  updateSelectedResources: (resources: number[]) =>
    dispatch({ type: 'updateSelectedResources', payload: resources }),
  clearFilters: () => dispatch({ type: 'clearFilfters' }),
  addFavouriteRealm: (realmId: number) =>
    dispatch({ type: 'addFavouriteRealm', payload: realmId }),
  removeFavouriteRealm: (realmId: number) =>
    dispatch({ type: 'removeFavouriteRealm', payload: realmId }),
  toggleRealmSelection: (realmId: number) =>
    dispatch({ type: 'toggleRealmSelection', payload: realmId }),
  toggleSelectAllRealms: (realmIds: number[]) =>
    dispatch({ type: 'toggleSelectAllRealms', payload: realmIds }),
});

const RealmContext = createContext<{
  state: RealmState;
  dispatch: Dispatch<RealmAction>;
  actions: RealmActions;
}>(null!);

export function useRealmContext() {
  return useContext(RealmContext);
}

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(realmReducer, {
    ...defaultRealmState,
    favouriteRealms: storage<number[]>(RealmFavoriteLocalStorageKey, []).get(),
  });

  return (
    <RealmContext.Provider
      value={{ state, dispatch, actions: mapActions(dispatch) }}
    >
      {children}
    </RealmContext.Provider>
  );
}
