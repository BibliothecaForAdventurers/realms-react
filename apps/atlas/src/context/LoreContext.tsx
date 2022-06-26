import type { Dispatch } from 'react';
import { useMemo, createContext, useContext, useReducer } from 'react';
// import type {} from '@/generated/graphql';
import { storage } from '@/util/localStorage';

const LoreFavoriteLocalStorageKey = 'lore.favourites';

interface LoreState {
  favouriteEntities: number[];
  selectedTab: number;
}

type LoreAction =
  | { type: 'clearFilters' }
  | { type: 'addFavouriteLoreEntity'; payload: number }
  | { type: 'removeFavouriteLoreEntity'; payload: number }
  | { type: 'updateSelectedTab'; payload: number };

interface LoreActions {
  clearFilters(): void;
  addFavouriteLoreEntity(realmId: number): void;
  removeFavouriteLoreEntity(realmId: number): void;
  // General actions for tabs and stuff
  updateSelectedTab(tab: number): void;
}

const defaultFilters = {
  searchIdFilter: '',
};

const defaultLoreState = {
  ...defaultFilters,
  favouriteEntities: [] as number[],
  selectedTab: 0,
};

function loreReducer(state: LoreState, action: LoreAction): LoreState {
  switch (action.type) {
    case 'updateSelectedTab':
      return { ...state, selectedTab: action.payload };
    case 'clearFilters':
      return { ...state, ...defaultFilters };
    case 'addFavouriteLoreEntity':
      storage<number[]>(LoreFavoriteLocalStorageKey, []).set([
        ...state.favouriteEntities,
        action.payload,
      ]);
      return {
        ...state,
        favouriteEntities: [...state.favouriteEntities, action.payload],
      };
    case 'removeFavouriteLoreEntity':
      storage<number[]>(LoreFavoriteLocalStorageKey, []).set(
        state.favouriteEntities.filter(
          (realmId: number) => realmId !== action.payload
        )
      );
      return {
        ...state,
        favouriteEntities: state.favouriteEntities.filter(
          (entityId: number) => entityId !== action.payload
        ),
      };
    default:
      return state;
  }
}

// Actions
const mapActions = (dispatch: Dispatch<LoreAction>): LoreActions => ({
  clearFilters: () => dispatch({ type: 'clearFilters' }),
  addFavouriteLoreEntity: (realmId: number) =>
    dispatch({ type: 'addFavouriteLoreEntity', payload: realmId }),
  removeFavouriteLoreEntity: (realmId: number) =>
    dispatch({ type: 'removeFavouriteLoreEntity', payload: realmId }),
  updateSelectedTab: (tab: number) =>
    dispatch({ type: 'updateSelectedTab', payload: tab }),
});

const LoreContext = createContext<{
  state: LoreState;
  dispatch: Dispatch<LoreAction>;
  actions: LoreActions;
}>(null!);

export function useLoreContext() {
  return useContext(LoreContext);
}

export function LoreProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(loreReducer, {
    ...defaultLoreState,
    favouriteEntities: storage<number[]>(LoreFavoriteLocalStorageKey, []).get(),
  });

  return (
    <LoreContext.Provider
      value={{ state, dispatch, actions: mapActions(dispatch) }}
    >
      {children}
    </LoreContext.Provider>
  );
}
