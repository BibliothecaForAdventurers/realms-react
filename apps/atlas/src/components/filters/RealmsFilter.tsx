import { Button } from '@bibliotheca-dao/ui-lib';
import clsx from 'clsx';
import { OrdersFilter } from '@/components/filters/OrdersFilter';
import { RealmsRarityFilter } from '@/components/filters/RealmsRarityFilter';
import { ResourcesFilter } from '@/components/filters/ResourcesFilter';
import { SearchFilter } from '@/components/filters/SearchFilter';
import { TraitsFilter } from '@/components/filters/TraitsFilter';
import { useRealmContext } from '@/context/RealmContext';
import { useAtlasContext } from '@/hooks/useAtlasContext';

type RealmsFilterProps = {
  isYourRealms: boolean;
};

export function RealmsFilter(props: RealmsFilterProps) {
  const { state, actions } = useRealmContext();

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-2">
        <div className="w-full my-1 sm:w-auto">
          <SearchFilter
            placeholder="SEARCH BY ID"
            onSubmit={(value) => {
              actions.updateSearchIdFilter(parseInt(value) ? value : '');
            }}
            defaultValue={state.searchIdFilter + ''}
          />
        </div>
        <div className="flex flex-wrap self-center gap-2 md:flex-nowrap">
          <div>
            <Button
              variant="primary"
              size="sm"
              className={clsx('', state.isSettledFilter ? 'bg-black' : '')}
              onClick={actions.toggleIsSettledFilter}
            >
              Settled
            </Button>
          </div>
          <div>
            <Button
              variant="primary"
              size="sm"
              className={clsx('', state.hasWonderFilter ? 'bg-black' : '')}
              onClick={actions.toggleHasWonderFilter}
            >
              Wonder
            </Button>
          </div>

          <ResourcesFilter
            selectedValues={state.selectedResources}
            onChange={actions.updateSelectedResources}
          />
          <OrdersFilter
            selectedValues={state.selectedOrders}
            onChange={actions.updateSelectedOrders}
          />
          <RealmsRarityFilter
            rarity={state.rarityFilter}
            onChange={actions.updateRarityFilter}
          />
          <TraitsFilter
            traits={state.traitsFilter}
            onChange={actions.updateTraitsFilter}
          />
        </div>
      </div>
    </div>
  );
}
