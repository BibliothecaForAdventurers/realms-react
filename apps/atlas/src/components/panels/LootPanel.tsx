import { useQuery } from '@apollo/client';
import { Tabs } from '@bibliotheca-dao/ui-lib';
import Bag from '@bibliotheca-dao/ui-lib/icons/bag.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { LootFilters } from '@/components/filters/LootFilters';
import { LootOverviews } from '@/components/tables/LootOverviews';
import { useLootContext } from '@/context/LootContext';
import { getLootsQuery } from '@/hooks/graphql/queries';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import Button from '@/shared/Button';
import type { Loot } from '@/types/index';
import { BasePanel } from './BasePanel';

export const LootPanel = () => {
  const { isDisplayLarge, selectedId, selectedPanel, openDetails } =
    useAtlasContext();
  const { account } = useWalletContext();
  const { state, actions } = useLootContext();

  const limit = 50;
  const [page, setPage] = useState(1);
  const previousPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);

  // Reset page on filter change. UseEffect doesn't do a deep compare
  useEffect(() => {
    setPage(1);
  }, [
    state.favouriteLoot,
    state.searchIdFilter,
    state.ratingFilter.bagGreatness,
    state.ratingFilter.bagRating,
    state.selectedTab,
  ]);

  const isLootPanel = selectedPanel === 'loot';
  const tabs = ['Your Loot', 'All Loot', 'Favourite Loot'];

  const variables = useMemo(() => {
    const where: any = {};
    if (state.searchIdFilter) {
      where.id = state.searchIdFilter;
    } else if (state.selectedTab === 2) {
      where.id_in = [...state.favouriteLoot];
    }

    if (state.selectedTab === 0) {
      where.currentOwner = account?.toLowerCase();
    }
    where.bagGreatness_gte = state.ratingFilter.bagGreatness.min;
    where.bagGreatness_lte = state.ratingFilter.bagGreatness.max;
    where.bagRating_gte = state.ratingFilter.bagRating.min;
    where.bagRating_lte = state.ratingFilter.bagRating.max;

    return {
      first: limit,
      skip: limit * (page - 1),
      where,
      orderBy: 'minted',
      orderDirection: 'asc',
    };
  }, [account, state, page]);

  const { loading, data } = useQuery<{ bags: Loot[] }>(getLootsQuery, {
    variables,
    skip: !isLootPanel,
  });

  useEffect(() => {
    if (
      !selectedId &&
      isDisplayLarge &&
      page === 1 &&
      (data?.bags?.length ?? 0) > 0
    ) {
      openDetails('loot', data?.bags[0].id as string);
    }
  }, [data, page]);

  const showPagination = () =>
    state.selectedTab === 1 &&
    (page > 1 || (data?.bags?.length ?? 0) === limit);

  const hasNoResults = () => !loading && (data?.bags?.length ?? 0) === 0;

  return (
    <BasePanel open={isLootPanel} style="lg:w-7/12">
      <div className="flex justify-between pt-2">
        <div className="sm:hidden"></div>
        <h1>Loot</h1>

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
        <LootFilters />
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Bag className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
        <LootOverviews bags={data?.bags ?? []} />
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
                See All Loot
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
          <Button onClick={nextPage} disabled={data?.bags?.length !== limit}>
            Next
          </Button>
        </div>
      )}
    </BasePanel>
  );
};
