import type { Dispatch } from 'react';
import { useMemo, createContext, useContext, useReducer } from 'react';
import type {} from // ResourceType,
// OrderType,
// RealmTraitType,
'@/generated/graphql';
import { storage } from '@/util/localStorage';

const LoreFavoriteLocalStorageKey = 'lore.favourites';

interface LoreState {
  favouriteEntities: number[];
  selectedTab: number;
}

type RealmAction =
  | { type: 'clearFilfters' }
  | { type: 'addFavouriteLoreEntity'; payload: number }
  | { type: 'removeFavouriteLoreEntity'; payload: number };

interface LoreActions {
  clearFilters(): void;
  addFavouriteLoreEntity(realmId: number): void;
  removeFavouriteLoreEntity(realmId: number): void;
}

const defaultFilters = {
  searchIdFilter: '',
};

const defaultLoreState = {
  ...defaultFilters,
  favouriteEntities: [] as number[],
  selectedTab: 1,
};

function realmReducer(state: LoreState, action: RealmAction): LoreState {
  switch (action.type) {
    case 'clearFilfters':
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
const mapActions = (dispatch: Dispatch<RealmAction>): LoreActions => ({
  clearFilters: () => dispatch({ type: 'clearFilfters' }),
  addFavouriteLoreEntity: (realmId: number) =>
    dispatch({ type: 'addFavouriteLoreEntity', payload: realmId }),
  removeFavouriteLoreEntity: (realmId: number) =>
    dispatch({ type: 'removeFavouriteLoreEntity', payload: realmId }),
});

const RealmContext = createContext<{
  state: LoreState;
  dispatch: Dispatch<RealmAction>;
  actions: LoreActions;
}>(null!);

export function useRealmContext() {
  return useContext(RealmContext);
}

export function RealmProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(realmReducer, {
    ...defaultLoreState,
    favouriteEntities: storage<number[]>(LoreFavoriteLocalStorageKey, []).get(),
  });

  return (
    <RealmContext.Provider
      value={{ state, dispatch, actions: mapActions(dispatch) }}
    >
      {children}
    </RealmContext.Provider>
  );
}
