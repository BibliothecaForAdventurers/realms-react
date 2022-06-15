import type { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';
import type { OrderType } from '@/generated/graphql';
import { storage } from '@/util/localStorage';
import { LootMax } from '../constants';
import type { MinMaxRange } from '../types';

const GAFavoriteLocalStorageKey = 'ga.favourites';

type RatingFilter = { bagGreatness: MinMaxRange; bagRating: MinMaxRange };

interface GaState {
  ratingFilter: RatingFilter;
  favouriteGa: string[];
  selectedOrders: OrderType[];
  searchIdFilter: string;
  selectedTab: number;
}

type GaAction =
  | { type: 'updateRatingFilter'; payload: RatingFilter }
  | { type: 'updateSelectedOrders'; payload: OrderType[] }
  | { type: 'clearFilfters' }
  | { type: 'addFavouriteGa'; payload: string }
  | { type: 'removeFavouriteGa'; payload: string }
  | { type: 'updateSearchIdFilter'; payload: string }
  | { type: 'updateSelectedTab'; payload: number };

interface GaActions {
  updateRatingFilter(filter: RatingFilter): void;
  updateSelectedOrders(orders: OrderType[]): void;
  clearFilters(): void;
  addFavouriteGa(id: string): void;
  removeFavouriteGa(id: string): void;
  updateSearchIdFilter(id: string): void;
  updateSelectedTab(tab: number): void;
}

const defaultFilters = {
  ratingFilter: {
    bagGreatness: { min: 0, max: LootMax.Greatness },
    bagRating: { min: 0, max: LootMax.Rating },
  },
  selectedOrders: [] as OrderType[],
  searchIdFilter: '',
};

const defaultGaState = {
  ...defaultFilters,
  favouriteGa: [] as string[],
  selectedTab: 1,
};

function gaReducer(state: GaState, action: GaAction): GaState {
  switch (action.type) {
    case 'updateRatingFilter':
      return { ...state, ratingFilter: action.payload };
    case 'updateSearchIdFilter':
      return { ...state, searchIdFilter: action.payload };
    case 'updateSelectedOrders':
      return { ...state, selectedOrders: [...action.payload] };
    case 'updateSelectedTab':
      return { ...state, selectedTab: action.payload };
    case 'clearFilfters':
      return { ...state, ...defaultFilters };
    case 'addFavouriteGa':
      storage<string[]>(GAFavoriteLocalStorageKey, []).set([
        ...state.favouriteGa,
        action.payload,
      ]);
      return {
        ...state,
        favouriteGa: [...state.favouriteGa, action.payload],
      };
    case 'removeFavouriteGa':
      storage<string[]>(GAFavoriteLocalStorageKey, []).set(
        state.favouriteGa.filter((id: string) => id !== action.payload)
      );
      return {
        ...state,
        favouriteGa: state.favouriteGa.filter(
          (id: string) => id !== action.payload
        ),
      };
    default:
      return state;
  }
}

// Actions
const mapActions = (dispatch: Dispatch<GaAction>): GaActions => ({
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
  addFavouriteGa: (id: string) =>
    dispatch({ type: 'addFavouriteGa', payload: id }),
  removeFavouriteGa: (id: string) =>
    dispatch({ type: 'removeFavouriteGa', payload: id }),
});

const GaContext = createContext<{
  state: GaState;
  dispatch: Dispatch<GaAction>;
  actions: GaActions;
}>(null!);

export function useGaContext() {
  return useContext(GaContext);
}

export function GaProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gaReducer, {
    ...defaultGaState,
    favouriteGa: storage<string[]>(GAFavoriteLocalStorageKey, []).get(),
  });

  return (
    <GaContext.Provider
      value={{ state, dispatch, actions: mapActions(dispatch) }}
    >
      {children}
    </GaContext.Provider>
  );
}
