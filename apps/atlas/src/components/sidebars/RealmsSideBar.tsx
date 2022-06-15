import { useQuery } from '@apollo/client';
import { Button } from '@bibliotheca-dao/ui-lib';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useGetRealmQuery } from '@/generated/graphql';
import { getRealmQuery } from '@/hooks/graphql/queries';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import type { Data } from '@/types/index';
import { RealmCard } from '../cards/RealmCard';
import { BaseSideBar } from './BaseSideBar';

export const RealmSideBar = () => {
  const { toggleMenuType, selectedMenuType, showDetails, selectedId } =
    useAtlasContext();
  const isRealmsSelected = selectedMenuType === 'realm' && showDetails;
  const { data, loading } = useGetRealmQuery({
    variables: {
      id: parseInt(selectedId),
    },
    skip: !isRealmsSelected,
  });

  return (
    <BaseSideBar open={isRealmsSelected}>
      <div className="top-0 bottom-0 right-0 w-full p-6 pt-8 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div className="flex justify-end">
          <div className="flex justify-end mb-2 mr-1">
            <Button size="sm" onClick={() => toggleMenuType('realm')}>
              <Close />
            </Button>
          </div>
        </div>
        {data && data.getRealm && (
          <RealmCard realm={data!.getRealm} loading={loading} />
        )}
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
