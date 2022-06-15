import { Button } from '@bibliotheca-dao/ui-lib';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import type { ReactElement } from 'react';
import { useGetRealmQuery } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { BasePanel } from './BasePanel';

export function TradePanel(): ReactElement {
  const { togglePanelType, selectedPanel } = useAtlasContext();

  const { data } = useGetRealmQuery({
    variables: {
      id: 1, // value for 'id'
    },
  });
  return (
    <BasePanel open={selectedPanel === 'trade'}>
      <div className="flex justify-between">
        <div className="sm:hidden"></div>

        <h1 className="tex">Bibliotheca NFT Marketplace</h1>
        <div>
          <Button variant="secondary" onClick={() => togglePanelType('trade')}>
            <Close />
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="p-2">{data && <div className="w-full h-48"></div>}</div>

        <div className="mt-8 text-3xl">
          <h4>A place to trade Realms, Crypts and Loot Items...</h4>
          <h4>Coming soon to StarkNet</h4>
        </div>
      </div>
    </BasePanel>
  );
}
