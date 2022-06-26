import { Tabs } from '@bibliotheca-dao/ui-lib';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useStarknet } from '@starknet-react/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
// import { RealmsFilter } from '@/components/filters/RealmsFilter';
import { hexToDecimalString } from 'starknet/dist/utils/number';
import { LoreEntitiesOverview } from '@/components/tables/LoreEntitiesOverview';
import { useLoreContext } from '@/context/LoreContext';
import {
  RealmTraitType,
  useGetLoreEntitiesLazyQuery,
  useGetLoreEntitiesQuery,
  useGetRealmsQuery,
} from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import Button from '@/shared/Button';
import { CreateLoreEntity } from '../modules/Lore/CreateLoreEntity';
import { BasePanel } from './BasePanel';

export const LorePanel = () => {
  const router = useRouter();

  const { setModal, selectedPanel } = useAtlasContext();
  const { account } = useWalletContext();
  const { account: starknetAccount } = useStarknet();
  const { state, actions } = useLoreContext();

  const limit = 50;
  const [page, setPage] = useState(1);
  const previousPage = () => setPage(page - 1);
  const nextPage = () => setPage(page + 1);

  // Reset page on filter change. UseEffect doesn't do a deep compare
  useEffect(() => {
    setPage(1);
  }, [state.selectedTab]);

  const isLorePanel = selectedPanel === 'lore';
  const tabs = ['All Scrolls', 'Your Scrolls', 'Create'];

  const variables = useMemo(() => {
    const filter = {} as any;

    if (state.selectedTab == 1 && starknetAccount) {
      filter.owner = { equals: hexToDecimalString(starknetAccount) };
    }

    return {
      filter,
      take: limit,
      skip: limit * (page - 1),
    };
  }, [account, state, page]);

  const [resyncEntities, { data, loading }] = useGetLoreEntitiesLazyQuery({
    variables,
  });

  useEffect(() => {
    resyncEntities();

    // Open Modal if the path is: /lore/{id}-some-slugged-header-for-ux
    if (router.query.segment && router.query.segment.length >= 2) {
      const spl = router.query.segment[1].split('-');

      console.log(router);

      if (spl.length > 0) {
        const id = parseInt(spl[0], 10) || 1;

        setModal({
          type: 'lore-entity',
          props: { id },
        });
      }
    }
  }, []);

  const showPagination = () =>
    state.selectedTab === 1 &&
    (page > 1 || (data?.getLoreEntities?.length ?? 0) === limit);

  const hasNoResults = () =>
    !loading && (data?.getLoreEntities?.length ?? 0) === 0;

  return (
    <BasePanel open={isLorePanel} style="lg:w-7/12">
      <div className="flex justify-between pt-2">
        <h1>Lore</h1>
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
