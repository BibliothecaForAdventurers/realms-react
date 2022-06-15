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
import { useGetRealmsQuery } from '@/generated/graphql';
import useSettling from '@/hooks/settling/useSettling';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import { RealmCard } from '../cards/RealmCard';
import { BaseSideBar } from './BaseSideBar';
type Props = {
  id: string;
};
type RealmsSelectableProps = {
  realms?: RealmFragmentFragment[];
  selectedTab: number;
};
type OwnerFilter =
  | {
      ownerL2: {
        equals: string | undefined;
      };
    }[]
  | {
      settledOwner: {
        equals: string | undefined;
      };
    }[];

function RealmsSelectable(props: RealmsSelectableProps): ReactElement {
  /* TBD refactor to seperate context? */
  const {
    state: { selectedRealms },
    actions,
  } = useRealmContext();
  const { account } = useStarknet();

  const starknetWallet = account ? BigNumber.from(account).toHexString() : '';

  const unsettledRealms = props.realms?.filter(
    (realm) => realm.ownerL2 == starknetWallet
  );
  const settledRealms = props.realms?.filter(
    (realm) => realm.settledOwner == starknetWallet
  );
  const displayedRealms =
    props.selectedTab === 0 ? unsettledRealms : settledRealms;

  return (
    <div>
      {displayedRealms &&
        displayedRealms.map((realm: RealmFragmentFragment, index) => (
          <SelectableRealm
            key={index}
            realm={realm}
            actions={actions}
            isSelected={selectedRealms.indexOf(realm.realmId) > -1}
          />
        ))}
    </div>
  );
}

/* TBD Should this be merged with Bridge Realms Sidebar */
export const SettleRealmsSideBar = () => {
  const { toggleMenuType, selectedMenuType, showDetails } = useAtlasContext();
  const { account } = useStarknet();
  const [selectedResource, setResource] = useState<number>();
  const isSettleRealms = selectedMenuType === 'settleRealms' && showDetails;

  const starknetWallet = account ? BigNumber.from(account).toHexString() : '';

  const { settleRealm, unsettleRealm, isRealmsApproved, approveRealms } =
    useSettling();
  const {
    state: { selectedRealms },
  } = useRealmContext();
  const limit = 50;
  const [page, setPage] = useState(1);

  const [filterOr, setFilterOr] = useState<OwnerFilter>([
    { settledOwner: { equals: starknetWallet } },
  ]);
  const variables = useMemo(() => {
    const filter = {} as any;

    filter.OR = [
      { ownerL2: { equals: starknetWallet } },
      { settledOwner: { equals: starknetWallet } },
    ];

    return {
      filter,
      take: limit,
      skip: limit * (page - 1),
    };
  }, [starknetWallet, page]);
  const [selectedTab, setSelectedTab] = useState(0);

  const { data, loading, refetch } = useGetRealmsQuery({
    variables,
    skip: !isSettleRealms,
  });

  const tabs = useMemo(
    () => [
      {
        label: 'Settle',
        component: (
          <RealmsSelectable
            selectedTab={selectedTab}
            realms={data?.getRealms}
          />
        ),
      },
      {
        label: 'Unsettle',
        component: (
          <RealmsSelectable
            selectedTab={selectedTab}
            realms={data?.getRealms}
          />
        ),
      },
    ],
    [data?.getRealms, selectedTab]
  );

  return (
    <BaseSideBar open={isSettleRealms}>
      <div className="relative top-0 bottom-0 right-0 flex flex-col justify-between w-full h-full p-6 pt-8 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div>
          <div className="flex justify-between mb-2">
            <h2>Settle Realms</h2>
            <div className="flex justify-end mb-2 mr-1">
              <Button size="sm" onClick={() => toggleMenuType('settleRealms')}>
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
        <div className="w-full">
          {isRealmsApproved != 'approved' && (
            <Button
              className="w-full"
              variant="primary"
              onClick={() => approveRealms()}
            >
              Approve Realms for Settling
            </Button>
          )}
          {isRealmsApproved == 'approved' && (
            <Button
              className="w-full"
              variant="primary"
              onClick={() =>
                selectedTab === 0
                  ? settleRealm(selectedRealms[0])
                  : unsettleRealm(selectedRealms[0])
              }
            >
              {selectedTab === 0 ? 'Settle Realms' : 'Unsettle Realms'}
            </Button>
          )}
        </div>
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Castle className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
      </div>
    </BaseSideBar>
  );
};
