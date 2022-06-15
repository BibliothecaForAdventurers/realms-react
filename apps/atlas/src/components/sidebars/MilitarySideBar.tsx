import { useQuery } from '@apollo/client';
import { OrderIcon, Tabs, ResourceIcon, Button } from '@bibliotheca-dao/ui-lib';

import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useStarknet } from '@starknet-react/core';
import { BigNumber } from 'ethers';
import type { ReactElement } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { SelectableRealm } from '@/components/tables/SelectableRealm';
import { useRealmContext } from '@/context/RealmContext';
import type { RealmFragmentFragment } from '@/generated/graphql';
import { useGetTroopStatsQuery, useGetRealmsQuery } from '@/generated/graphql';
import useSettling from '@/hooks/settling/useSettling';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import { RealmCard } from '../cards/RealmCard';
import { ArmoryBuilder } from '../tables/Armory';
import { MilitaryStatistics } from '../tables/MilitaryStatistics';
import { TransactionCartTable } from '../tables/Transactions';
import { BaseSideBar } from './BaseSideBar';
type Props = {
  id: string;
};
type RealmsSelectableProps = {
  realms?: RealmFragmentFragment[];
  selectedTab: number;
};

export const MilitarySideBar = () => {
  const { toggleMenuType, selectedMenuType, showDetails } = useAtlasContext();
  const { account } = useStarknet();
  const isSettleRealms = selectedMenuType === 'military' && showDetails;

  const starknetWallet = account ? BigNumber.from(account).toHexString() : '';

  const [selectedTab, setSelectedTab] = useState(1);
  const { data: troopStatsData } = useGetTroopStatsQuery();

  const tabs = useMemo(
    () => [
      {
        label: 'Armory',
        component: (
          <ArmoryBuilder
            realmId={5500}
            statistics={troopStatsData?.getTroopStats}
          />
        ),
      },
      {
        label: 'Statistics & Cost',
        component: (
          <MilitaryStatistics statistics={troopStatsData?.getTroopStats} />
        ),
      },
    ],
    [selectedTab]
  );

  return (
    <BaseSideBar open={isSettleRealms}>
      <div className="relative top-0 bottom-0 right-0 z-50 flex flex-col justify-between w-full h-full p-6 pt-8 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div>
          <div className="flex justify-between mb-2">
            <h2>Military Cart</h2>
            <div className="flex justify-end mb-2 mr-1">
              <Button size="sm" onClick={() => toggleMenuType('military')}>
                <Close />
              </Button>
            </div>
          </div>

          <Tabs
            selectedIndex={selectedTab}
            onChange={(index) => setSelectedTab(index as number)}
            variant="primary"
          >
            <Tabs.List className="">
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.label} className="uppercase">
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <Tabs.Panels>
              {tabs.map((tab) => (
                <Tabs.Panel key={tab.label}>{tab.component}</Tabs.Panel>
              ))}
            </Tabs.Panels>
          </Tabs>
        </div>

        {/* {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <h2>Loading</h2>
          </div>
        )} */}
      </div>
    </BaseSideBar>
  );
};
