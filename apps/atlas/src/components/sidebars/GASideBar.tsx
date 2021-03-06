import { useQuery } from '@apollo/client';
import { Button } from '@bibliotheca-dao/ui-lib';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import Helm from '@bibliotheca-dao/ui-lib/icons/helm.svg';
import { getGAQuery } from '@/hooks/graphql/queries';
import { useUIContext } from '@/hooks/useUIContext';
import type { GAData } from '@/types/index';
import { GAdventurer } from '../cards/GAdventurer';
import { BaseSideBar } from './BaseSideBar';
type Props = {
  id: string;
};

export const GASideBar = (props: Props) => {
  const { toggleMenuType, selectedMenuType, showDetails } = useUIContext();

  const { loading, error, data } = useQuery<GAData>(getGAQuery, {
    variables: { id: props.id },
  });

  return (
    <BaseSideBar open={selectedMenuType === 'ga' && showDetails}>
      <div className="top-0 bottom-0 right-0 z-20 w-full h-screen p-6 pt-10 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div className="flex justify-end mb-2 mr-1">
          <Button size="sm" onClick={() => toggleMenuType('ga')}>
            <Close />
          </Button>
        </div>
        {data && data.gadventurer && (
          <GAdventurer flyto={false} ga={data!.gadventurer} loading={loading} />
        )}
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Helm className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}
      </div>
    </BaseSideBar>
  );
};
