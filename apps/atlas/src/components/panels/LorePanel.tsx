import { Tabs } from '@bibliotheca-dao/ui-lib';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useStarknet } from '@starknet-react/core';
import { useEffect, useMemo, useState } from 'react';
// import { RealmsFilter } from '@/components/filters/RealmsFilter';
import { hexToDecimalString } from 'starknet/dist/utils/number';
import { LoreEntitiesOverview } from '@/components/tables/LoreEntitiesOverview';
import { useRealmContext } from '@/context/RealmContext';
import {
  RealmTraitType,
  useGetLoreEntitiesQuery,
  useGetRealmsQuery,
} from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import Button from '@/shared/Button';
import { CreateLoreEntity } from '../modules/Lore/CreateLoreEntity';
import { BasePanel } from './BasePanel';

export const LorePanel = () => {
  const { isDisplayLarge, togglePanelType, selectedPanel, openDetails } =
    useAtlasContext();
  const { account } = useWalletContext();
  const { account: starknetAccount } = useStarknet();
  const { state, actions } = useRealmContext();

  const limit = 50;
  const [page, setPage] = useState(1);
  const previousPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);

  // Reset page on filter change. UseEffect doesn't do a deep compare
  useEffect(() => {
    setPage(1);
  }, [
    // state.favouriteRealms,
    // state.selectedPOIs,
    // // state.selectedPOIs,
    // state.searchIdFilter,
    // state.hasWonderFilter,
    // state.rarityFilter.rarityRank,
    // state.rarityFilter.rarityScore,
    // state.traitsFilter.City,
    // state.traitsFilter.Harbor,
    // state.traitsFilter.Region,
    // state.traitsFilter.River,
    state.selectedTab,
  ]);

  const isLorePanel = selectedPanel === 'lore';
  const tabs = ['All Scrolls', 'Your Scrolls', 'Create'];

  const variables = useMemo(() => {
    const resourceFilters = state.selectedResources.map((resource) => ({
      resourceType: { equals: resource },
    }));

    // const traitsFilters = Object.keys(state.traitsFilter)
    //   // Filter 0 entries
    //   .filter((key: string) => (state.traitsFilter as any)[key])
    //   .map((key: string) => ({
    //     trait: {
    //       type: key as RealmTraitType,
    //       qty: { gte: (state.traitsFilter as any)[key] },
    //     },
    //   }));

    const filter = {} as any;

    if (state.selectedTab == 1 && starknetAccount) {
      filter.owner = { equals: hexToDecimalString(starknetAccount) };
    }

    // if (state.searchIdFilter) {
    //   filter.realmId = { equals: parseInt(state.searchIdFilter) };
    // } else if (state.selectedTab === 2) {
    //   filter.realmId = { in: [...state.favouriteRealms] };
    // }

    // if (state.selectedTab === 0) {
    //   filter.OR = [
    //     { owner: { equals: account?.toLowerCase() } },
    //     { bridgedOwner: { equals: account?.toLowerCase() } },
    //   ];
    // }

    // if (state.hasWonderFilter) {
    //   filter.NOT = {
    //     wonder: { equals: null },
    //   };
    // }

    // filter.rarityRank = { gte: state.rarityFilter.rarityRank };
    // filter.rarityScore = { gte: state.rarityFilter.rarityScore };
    // filter.orderType =
    //   state.selectedOrders.length > 0
    //     ? { in: [...state.selectedOrders] }
    //     : undefined;
    // filter.AND = [...resourceFilters, ...traitsFilters];

    return {
      filter,
      take: limit,
      skip: limit * (page - 1),
    };
  }, [account, state, page]);

  const { data, loading } = useGetLoreEntitiesQuery({
    variables,
    skip: !isLorePanel,
  });

  // useEffect(() => {
  //   if (
  //     isDisplayLarge &&
  //     page === 1 &&
  //     (data?.getLoreEntities?.length ?? 0) > 0
  //   ) {
  //     openDetails('realm', data?.getRealms[0].realmId + '');
  //   }
  // }, [data, page]);

  const showPagination = () =>
    state.selectedTab === 1 &&
    (page > 1 || (data?.getLoreEntities?.length ?? 0) === limit);

  const hasNoResults = () =>
    !loading && (data?.getLoreEntities?.length ?? 0) === 0;

  return (
    <BasePanel open={isLorePanel}>
      <div className="flex justify-between pt-2">
        <div className="sm:hidden"></div>
        <h1>Lore</h1>

        <button
          className="z-50 transition-all rounded sm:hidden top-4"
          onClick={() => togglePanelType('realm')}
        >
          <Close />
        </button>
      </div>
      <Tabs
        selectedIndex={state.selectedTab}
        onChange={actions.updateSelectedTab as any}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab} className="uppercase">
              {tab}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <div>
        {/* <RealmsFilter /> */}
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Castle className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
        {state.selectedTab === 2 ? (
          <CreateLoreEntity />
        ) : (
          <LoreEntitiesOverview entities={data?.getLoreEntities ?? []} />
        )}
      </div>

      {/* don't show feedback and menu at the "create" tab */}
      {hasNoResults() && state.selectedTab != 2 && (
        <div className="flex flex-col items-center justify-center gap-8 my-8">
          <h2>No results.</h2>
          <div className="flex gap-4">
            <Button
              className="whitespace-nowrap"
              onClick={actions.clearFilters}
            >
              Clear Filters
            </Button>
            {state.selectedTab !== 1 && (
              <Button
                className="whitespace-nowrap"
                onClick={() => actions.updateSelectedTab(1)}
              >
                See All Realms
              </Button>
            )}
          </div>
        </div>
      )}

      {showPagination() && (
        <div className="flex gap-2 my-8">
          <Button onClick={previousPage} disabled={page === 1}>
            Previous
          </Button>
          <Button
            onClick={nextPage}
            disabled={data?.getLoreEntities?.length !== limit}
          >
            Next
          </Button>
        </div>
      )}
    </BasePanel>
  );
};
