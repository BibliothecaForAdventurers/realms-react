import { useQuery } from '@apollo/client';
import { Button } from '@bibliotheca-dao/ui-lib';
import Bag from '@bibliotheca-dao/ui-lib/icons/bag.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { getLootQuery } from '@/hooks/graphql/queries';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import type { LootData } from '@/types/index';
import { Loot } from '../cards/Loot';
import { BaseSideBar } from './BaseSideBar';

export const LootSideBar = () => {
  const { toggleMenuType, selectedMenuType, showDetails, selectedId } =
    useAtlasContext();
  const isLootSelected = selectedMenuType === 'loot' && showDetails;
  const { loading, error, data } = useQuery<LootData>(getLootQuery, {
    variables: { id: selectedId.toString() },
    skip: !isLootSelected,
  });

  return (
    <BaseSideBar open={isLootSelected}>
      <div className="top-0 bottom-0 right-0 z-20 w-full h-screen p-6 pt-10 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div className="flex justify-end mb-2 mr-1">
          <Button size="sm" onClick={() => toggleMenuType('loot')}>
            <Close />
          </Button>
        </div>
        {data && data.bag && (
          <Loot flyto={false} loot={data!.bag} loading={loading} />
        )}
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Bag className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
      </div>
    </BaseSideBar>
  );
};
