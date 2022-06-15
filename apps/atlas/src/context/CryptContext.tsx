import type { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';
import { storage } from '@/util/localStorage';
import { CryptsMax } from '../constants';
import type { MinMaxRange } from '../types';

const CryptFavoriteLocalStorageKey = 'crypt.favourites';

type StatsFilter = {
  size: MinMaxRange;
  numDoors: MinMaxRange;
  numPoints: MinMaxRange;
};

interface CryptState {
  statsFilter: StatsFilter;
  environmentsFilter: number[];
  favouriteCrypt: string[];
  searchIdFilter: string;
  selectedTab: number;
  isLegendaryFilter: boolean;
}

type CryptAction =
  | { type: 'updateStatsFilter'; payload: StatsFilter }
  | { type: 'updateEnvironmentsFilter'; payload: number[] }
  | { type: 'toggleIsLegendaryFilter' }
  | { type: 'clearFilfters' }
  | { type: 'addFavouriteCrypt'; payload: string }
  | { type: 'removeFavouriteCrypt'; payload: string }
  | { type: 'updateSearchIdFilter'; payload: string }
  | { type: 'updateSelectedTab'; payload: number };

interface CryptActions {
  updateStatsFilter(filter: StatsFilter): void;
  updateEnvironmentsFilter(envs: number[]): void;
  clearFilters(): void;
  addFavouriteCrypt(id: string): void;
  removeFavouriteCrypt(id: string): void;
  updateSearchIdFilter(id: string): void;
  updateSelectedTab(tab: number): void;
  toggleIsLegendaryFilter(): void;
}

const defaultFilters = {
  statsFilter: {
    size: { min: 0, max: CryptsMax.Size },
    numDoors: { min: 0, max: CryptsMax.NumDoors },
    numPoints: { min: 0, max: CryptsMax.NumPoints },
  },
  environmentsFilter: [],
  searchIdFilter: '',
  isLegendaryFilter: false,
};

const defaultCryptState = {
  ...defaultFilters,
  favouriteCrypt: [] as string[],
  selectedTab: 1,
};

function cryptReducer(state: CryptState, action: CryptAction): CryptState {
  switch (action.type) {
    case 'updateStatsFilter':
      return { ...state, statsFilter: action.payload };
    case 'updateEnvironmentsFilter':
      return { ...state, environmentsFilter: [...action.payload] };
    case 'updateSearchIdFilter':
      return { ...state, searchIdFilter: action.payload };
    case 'updateSelectedTab':
      return { ...state, selectedTab: action.payload };
    case 'clearFilfters':
      return { ...state, ...defaultFilters };
    case 'toggleIsLegendaryFilter':
      return { ...state, isLegendaryFilter: !state.isLegendaryFilter };
      break;
    case 'addFavouriteCrypt':
      storage<string[]>(CryptFavoriteLocalStorageKey, []).set([
        ...state.favouriteCrypt,
        action.payload,
      ]);
      return {
        ...state,
        favouriteCrypt: [...state.favouriteCrypt, action.payload],
      };
    case 'removeFavouriteCrypt':
      storage<string[]>(CryptFavoriteLocalStorageKey, []).set(
        state.favouriteCrypt.filter((id: string) => id !== action.payload)
      );
      return {
        ...state,
        favouriteCrypt: state.favouriteCrypt.filter(
          (id: string) => id !== action.payload
        ),
      };

    default:
      return state;
  }
}

// Actions
const mapActions = (dispatch: Dispatch<CryptAction>): CryptActions => ({
  updateStatsFilter: (filter: StatsFilter) =>
    dispatch({
      type: 'updateStatsFilter',
      payload: filter,
    }),
  updateSearchIdFilter: (id: string) =>
    dispatch({ type: 'updateSearchIdFilter', payload: id }),
  updateEnvironmentsFilter: (envs: number[]) =>
    dispatch({ type: 'updateEnvironmentsFilter', payload: envs }),
  updateSelectedTab: (tab: number) =>
    dispatch({ type: 'updateSelectedTab', payload: tab }),
  toggleIsLegendaryFilter: () => dispatch({ type: 'toggleIsLegendaryFilter' }),
  clearFilters: () => dispatch({ type: 'clearFilfters' }),
  addFavouriteCrypt: (id: string) =>
    dispatch({ type: 'addFavouriteCrypt', payload: id }),
  removeFavouriteCrypt: (id: string) =>
    dispatch({ type: 'removeFavouriteCrypt', payload: id }),
});

const CryptContext = createContext<{
  state: CryptState;
  dispatch: Dispatch<CryptAction>;
  actions: CryptActions;
}>(null!);

export function useCryptContext() {
  return useContext(CryptContext);
}

export function CryptProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cryptReducer, {
    ...defaultCryptState,
    favouriteCrypt: storage<string[]>(CryptFavoriteLocalStorageKey, []).get(),
  });

  return (
    <CryptContext.Provider
      value={{ state, dispatch, actions: mapActions(dispatch) }}
    >
      {children}
    </CryptContext.Provider>
  );
}
