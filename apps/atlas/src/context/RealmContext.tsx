import type { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';
import type { ResourceType, OrderType } from '@/generated/graphql';
import { RealmTraitType } from '@/generated/graphql';
import { storage } from '@/util/localStorage';

const RealmFavoriteLocalStorageKey = 'realm.favourites';

type RarityFilter = { rarityScore: number; rarityRank: number };

type TraitsFilter = {
  [RealmTraitType.Region]: number;
  [RealmTraitType.City]: number;
  [RealmTraitType.Harbor]: number;
  [RealmTraitType.River]: number;
};

interface RealmState {
  rarityFilter: RarityFilter;
  traitsFilter: TraitsFilter;
  selectedOrders: OrderType[];
  selectedResources: ResourceType[];
  favouriteRealms: number[];
  searchIdFilter: string;
  selectedTab: number;
  hasWonderFilter: boolean;
}

type RealmAction =
  | { type: 'updateRarityFilter'; payload: RarityFilter }
  | { type: 'updateTraitsFilter'; payload: TraitsFilter }
  | { type: 'updateSelectedOrders'; payload: OrderType[] }
  | { type: 'updateSelectedResources'; payload: ResourceType[] }
  | { type: 'toggleHasWonderFilter' }
  | { type: 'clearFilfters' }
  | { type: 'addFavouriteRealm'; payload: number }
  | { type: 'removeFavouriteRealm'; payload: number }
  | { type: 'updateSearchIdFilter'; payload: string }
  | { type: 'updateSelectedTab'; payload: number };

interface RealmActions {
  updateRarityFilter(filter: RarityFilter): void;
  updateTraitsFilter(filter: TraitsFilter): void;
  updateSelectedOrders(orders: OrderType[]): void;
  updateSelectedResources(resources: ResourceType[]): void;
  toggleHasWonderFilter(): void;
  clearFilters(): void;
  addFavouriteRealm(realmId: number): void;
  removeFavouriteRealm(realmId: number): void;
  updateSearchIdFilter(realmId: string): void;
  updateSelectedTab(tab: number): void;
}

const defaultFilters = {
  rarityFilter: {
    rarityScore: 0,
    rarityRank: 0,
  },
  traitsFilter: {
    [RealmTraitType.Region]: 0,
    [RealmTraitType.City]: 0,
    [RealmTraitType.Harbor]: 0,
    [RealmTraitType.River]: 0,
  },
  selectedOrders: [] as OrderType[],
  selectedResources: [] as ResourceType[],
  searchIdFilter: '',
  hasWonderFilter: false,
};
const defaultRealmState = {
  ...defaultFilters,
  favouriteRealms: [] as number[],
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
  updateTraitsFilter: (filter: TraitsFilter) =>
    dispatch({ type: 'updateTraitsFilter', payload: filter }),
  updateSelectedOrders: (orders: OrderType[]) =>
    dispatch({ type: 'updateSelectedOrders', payload: orders }),
  updateSelectedResources: (resources: ResourceType[]) =>
    dispatch({ type: 'updateSelectedResources', payload: resources }),
  clearFilters: () => dispatch({ type: 'clearFilfters' }),
  addFavouriteRealm: (realmId: number) =>
    dispatch({ type: 'addFavouriteRealm', payload: realmId }),
  removeFavouriteRealm: (realmId: number) =>
    dispatch({ type: 'removeFavouriteRealm', payload: realmId }),
});

const RealmContext = createContext<{
  state: RealmState;
  dispatch: Dispatch<RealmAction>;
  actions: RealmActions;
}>(null!);

export function useRealmContext() {
  return useContext(RealmContext);
}

export function RealmProvider({ children }: { children: JSX.Element }) {
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
