import type { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';
import type { OrderType } from '@/generated/graphql';
import { storage } from '@/util/localStorage';
import { LootMax } from '../constants';
import type { MinMaxRange } from '../types';

const LootFavoriteLocalStorageKey = 'loot.favourites';

type RatingFilter = { bagGreatness: MinMaxRange; bagRating: MinMaxRange };

interface LootState {
  ratingFilter: RatingFilter;
  selectedOrders: OrderType[];
  favouriteLoot: string[];
  searchIdFilter: string;
  selectedTab: number;
}

type LootAction =
  | { type: 'updateRatingFilter'; payload: RatingFilter }
  | { type: 'updateSelectedOrders'; payload: OrderType[] }
  | { type: 'clearFilfters' }
  | { type: 'addFavouriteLoot'; payload: string }
  | { type: 'removeFavouriteLoot'; payload: string }
  | { type: 'updateSearchIdFilter'; payload: string }
  | { type: 'updateSelectedTab'; payload: number };

interface LootActions {
  updateRatingFilter(filter: RatingFilter): void;
  updateSelectedOrders(orders: OrderType[]): void;
  clearFilters(): void;
  addFavouriteLoot(id: string): void;
  removeFavouriteLoot(id: string): void;
  updateSearchIdFilter(id: string): void;
  updateSelectedTab(tab: number): void;
}

const defaultFilters = {
  ratingFilter: {
    bagGreatness: {
      min: 0,
      max: LootMax.Greatness,
    },
    bagRating: {
      min: 0,
      max: LootMax.Rating,
    },
  },
  selectedOrders: [] as OrderType[],
  searchIdFilter: '',
};
const defaultLootState = {
  ...defaultFilters,
  favouriteLoot: [] as string[],
  selectedTab: 1,
};

function lootReducer(state: LootState, action: LootAction): LootState {
  switch (action.type) {
    case 'updateRatingFilter':
      return { ...state, ratingFilter: action.payload };
    case 'updateSearchIdFilter':
      return { ...state, searchIdFilter: action.payload };
    case 'updateSelectedTab':
      return { ...state, selectedTab: action.payload };
    case 'updateSelectedOrders':
      return { ...state, selectedOrders: [...action.payload] };
    case 'clearFilfters':
      return { ...state, ...defaultFilters };
    case 'addFavouriteLoot':
      storage<string[]>(LootFavoriteLocalStorageKey, []).set([
        ...state.favouriteLoot,
        action.payload,
      ]);
      return {
        ...state,
        favouriteLoot: [...state.favouriteLoot, action.payload],
      };
    case 'removeFavouriteLoot':
      storage<string[]>(LootFavoriteLocalStorageKey, []).set(
        state.favouriteLoot.filter((id: string) => id !== action.payload)
      );
      return {
        ...state,
        favouriteLoot: state.favouriteLoot.filter(
          (id: string) => id !== action.payload
        ),
      };
    default:
      return state;
  }
}

// Actions
const mapActions = (dispatch: Dispatch<LootAction>): LootActions => ({
  updateRatingFilter: (filter: RatingFilter) =>
    dispatch({
      type: 'updateRatingFilter',
      payload: filter,
    }),
  updateSearchIdFilter: (id: string) =>
    dispatch({ type: 'updateSearchIdFilter', payload: id }),
  updateSelectedTab: (tab: number) =>
    dispatch({ type: 'updateSelectedTab', payload: tab }),
  updateSelectedOrders: (orders: OrderType[]) =>
    dispatch({ type: 'updateSelectedOrders', payload: orders }),
  clearFilters: () => dispatch({ type: 'clearFilfters' }),
  addFavouriteLoot: (id: string) =>
    dispatch({ type: 'addFavouriteLoot', payload: id }),
  removeFavouriteLoot: (id: string) =>
    dispatch({ type: 'removeFavouriteLoot', payload: id }),
});

const LootContext = createContext<{
  state: LootState;
  dispatch: Dispatch<LootAction>;
  actions: LootActions;
}>(null!);

export function useLootContext() {
  return useContext(LootContext);
}

export function LootProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(lootReducer, {
    ...defaultLootState,
    favouriteLoot: storage<string[]>(LootFavoriteLocalStorageKey, []).get(),
  });

  return (
    <LootContext.Provider
      value={{ state, dispatch, actions: mapActions(dispatch) }}
    >
      {children}
    </LootContext.Provider>
  );
}
