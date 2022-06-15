import { Tabs } from '@bibliotheca-dao/ui-lib';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useStarknet } from '@starknet-react/core';
import { BigNumber } from 'ethers';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { RealmsFilter } from '@/components/filters/RealmsFilter';
import { RealmOverviews } from '@/components/tables/RealmOverviews';
import { useRealmContext } from '@/context/RealmContext';
import type { RealmTraitType } from '@/generated/graphql';
import { useGetRealmsQuery } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import Button from '@/shared/Button';
import { BasePanel } from './BasePanel';

export const RealmsPanel = () => {
  const { isDisplayLarge, selectedId, selectedPanel, openDetails } =
    useAtlasContext();
  const { account } = useWalletContext();
  const { account: starkAccount } = useStarknet();
  const { state, actions } = useRealmContext();

  const limit = 50;
  const [page, setPage] = useState(1);
  const previousPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);

  const starknetWallet = starkAccount
    ? BigNumber.from(starkAccount).toHexString()
    : '';

  // Reset page on filter change. UseEffect doesn't do a deep compare
  useEffect(() => {
    setPage(1);
  }, [
    state.favouriteRealms,
    state.selectedOrders,
    state.searchIdFilter,
    state.hasWonderFilter,
    state.rarityFilter.rank,
    state.rarityFilter.score,
    state.traitsFilter.City,
    state.traitsFilter.Harbor,
    state.traitsFilter.Region,
    state.traitsFilter.River,
    state.selectedTab,
  ]);

  const isRealmPanel = selectedPanel === 'realm';
  const tabs = ['Your Realms', 'All Realms', 'Favourite Realms'];

  const variables = useMemo(() => {
    const resourceFilters = state.selectedResources.map((resource) => ({
      resources: { some: { resourceId: { equals: resource } } },
    }));

    const traitsFilters = Object.keys(state.traitsFilter)
      // Filter 0 entries
      .filter((key: string) => state.traitsFilter[key])
      .map((key: string) => ({
        traits: {
          some: {
            type: { equals: key as RealmTraitType },
            qty: {
              gte: state.traitsFilter[key].min,
              lte: state.traitsFilter[key].max,
            },
          },
        },
      }));

    const filter = {} as any;
    if (state.searchIdFilter) {
      filter.realmId = { equals: parseInt(state.searchIdFilter) };
    } else if (state.selectedTab === 2) {
      filter.realmId = { in: [...state.favouriteRealms] };
    }

    if (state.selectedTab === 0) {
      filter.OR = [
        { owner: { equals: account?.toLowerCase() } },
        { bridgedOwner: { equals: account?.toLowerCase() } },
        { ownerL2: { equals: starknetWallet } },
        { settledOwner: { equals: starknetWallet } },
      ];
    }

    if (state.hasWonderFilter) {
      filter.NOT = {
        wonder: { equals: null },
      };
    }

    if (state.isSettledFilter) {
      filter.NOT = {
        settledOwner: { equals: null },
      };
    }

    filter.rarityRank = {
      gte: state.rarityFilter.rank.min,
      lte: state.rarityFilter.rank.max,
    };
    filter.rarityScore = {
      gte: state.rarityFilter.score.min,
      lte: state.rarityFilter.score.max,
    };
    filter.orderType =
      state.selectedOrders.length > 0
        ? { in: [...state.selectedOrders] }
        : undefined;
    filter.AND = [...resourceFilters, ...traitsFilters];

    return {
      filter,
      take: limit,
      skip: limit * (page - 1),
    };
  }, [account, state, page]);

  const { data, loading } = useGetRealmsQuery({
    variables,
    skip: !isRealmPanel,
  });

  useEffect(() => {
    if (
      !selectedId &&
      isDisplayLarge &&
      page === 1 &&
      (data?.getRealms?.length ?? 0) > 0
    ) {
      openDetails('realm', data?.getRealms[0].realmId + '');
    }
  }, [data, page, selectedId]);

  const showPagination = () =>
    state.selectedTab === 1 &&
    (page > 1 || (data?.getRealms?.length ?? 0) === limit);

  const hasNoResults = () => !loading && (data?.getRealms?.length ?? 0) === 0;

  return (
    <BasePanel open={isRealmPanel} style="lg:w-7/12">
      <div className="flex justify-between pt-2">
        <div className="sm:hidden"></div>
        <h1>Realms</h1>
        <Link href="/">
          <button className="z-50 transition-all rounded top-4">
            <Close />
          </button>
        </Link>
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
        <RealmsFilter isYourRealms={state.selectedTab === 0} />
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Castle className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
        <RealmOverviews
          realms={data?.getRealms ?? []}
          isYourRealms={state.selectedTab === 0}
        />
      </div>

      {hasNoResults() && (
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
            disabled={data?.getRealms?.length !== limit}
          >
            Next
          </Button>
        </div>
      )}
    </BasePanel>
  );
};
