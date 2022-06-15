import { useQuery } from '@apollo/client';
import { Button } from '@bibliotheca-dao/ui-lib/base';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import Danger from '@bibliotheca-dao/ui-lib/icons/danger.svg';
import { getCryptQuery } from '@/hooks/graphql/queries';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import type { CryptData } from '@/types/index';
import { Crypt } from '../cards/Crypt';
import { BaseSideBar } from './BaseSideBar';

export const CryptsSideBar = () => {
  const { toggleMenuType, selectedMenuType, showDetails, selectedId } =
    useAtlasContext();
  const isCryptsSelected = selectedMenuType === 'crypt' && showDetails;
  const { loading, error, data } = useQuery<CryptData>(getCryptQuery, {
    variables: { id: selectedId },
    skip: !isCryptsSelected,
  });

  return (
    <BaseSideBar open={isCryptsSelected}>
      <div className="top-0 bottom-0 right-0 z-20 w-full h-screen p-6 pt-10 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div className="flex justify-end">
          <Button size="sm" onClick={() => toggleMenuType('crypt')}>
            <Close />
          </Button>
        </div>
        {data && data.dungeon && (
          <Crypt flyto={false} crypt={data!.dungeon} loading={loading} />
        )}
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Danger className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
      </div>
    </BaseSideBar>
  );
};
