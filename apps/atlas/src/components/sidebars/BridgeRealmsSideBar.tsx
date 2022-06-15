import { useQuery } from '@apollo/client';
import { Button } from '@bibliotheca-dao/ui-lib';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useState, useMemo } from 'react';
import { SelectableRealm } from '@/components/tables/SelectableRealm';
import { useRealmContext } from '@/context/RealmContext';
import type { RealmFragmentFragment } from '@/generated/graphql';
import { useGetRealmsQuery } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import { RealmCard } from '../cards/RealmCard';
import { BaseSideBar } from './BaseSideBar';
type Props = {
  id: string;
};

export const BridgeRealmsSideBar = () => {
  const { toggleMenuType, selectedMenuType, showDetails } = useAtlasContext();
  const { account } = useWalletContext();
  const [selectedResource, setResource] = useState<number>();
  const isBridgeRealms = selectedMenuType === 'bridgeRealms' && showDetails;
  const limit = 50;
  const [page, setPage] = useState(1);

  const variables = useMemo(() => {
    const filter = {} as any;

    filter.OR = [{ owner: { equals: account?.toLowerCase() } }];

    return {
      filter,
      take: limit,
      skip: limit * (page - 1),
    };
  }, [account, page]);

  const { data, loading } = useGetRealmsQuery({
    variables,
    skip: !isBridgeRealms,
  });
  const {
    state: { selectedRealms },
    actions,
  } = useRealmContext();

  const toggleSelectAllRealms = () =>
    actions.toggleSelectAllRealms(
      (data?.getRealms || []).map((realm) => realm.realmId)
    );

  return (
    <BaseSideBar open={isBridgeRealms}>
      <div className="relative top-0 bottom-0 right-0 flex flex-col justify-between w-full h-full p-6 pt-8 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div>
          <div className="flex justify-between mb-2">
            <h2>Bridge Realms</h2>
            <div className="flex justify-end mb-2 mr-1">
              <Button size="sm" onClick={() => toggleMenuType('bridgeRealms')}>
                <Close />
              </Button>
            </div>
          </div>
          <div className="flex justify-end mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleSelectAllRealms}
            >
              {selectedRealms.length > 0 ? `Deselect All` : `Select All`}
            </Button>
          </div>
          {data &&
            data.getRealms &&
            data.getRealms.map((realm: RealmFragmentFragment, index) => (
              <SelectableRealm
                key={index}
                realm={realm}
                actions={actions}
                isSelected={selectedRealms.indexOf(realm.realmId) > -1}
              />
            ))}
        </div>
        <div className="w-full">
          <Button className="w-full" variant="primary" onClick={() => null}>
            Bridge Realms
          </Button>
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
