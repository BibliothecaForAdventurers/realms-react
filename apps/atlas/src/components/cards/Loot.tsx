import { Button } from '@bibliotheca-dao/ui-lib';
import { rarityColor } from 'loot-rarity';
import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useEnsResolver } from '@/hooks/useEnsResolver';
import getGreatness from '@/services/getGreatness';
import { LootItemIcon } from '@/shared/LootItemIcon';
import { MarketplaceByPanel } from '@/shared/MarketplaceByPanel';
import type { LootProps } from '../../types';

const variantMaps: any = {
  small: { heading: 'lg:text-4xl', regions: 'lg:text-xl' },
};

export function Loot(props: LootProps): ReactElement {
  const [metaData, setMetaData] = useState(null);
  const { gotoAssetId } = useAtlasContext();
  const ensData = useEnsResolver(props.loot.currentOwner.address);

  const mappedProperties = [
    'weapon',
    'chest',
    'head',
    'waist',
    'foot',
    'hand',
    'neck',
    'ring',
  ];

  const isManaUnClaimed = (itemIdx: number) => {
    const numOrders = mappedProperties.filter(
      (item) => props.loot[item + 'SuffixId'] > 0
    ).length;
    if (
      numOrders == 0 ||
      numOrders === props.loot.manas.length ||
      props.loot[mappedProperties[itemIdx] + 'SuffixId'] === 0
    ) {
      return false;
    }
    return !props.loot.manas.find((mana) => mana.inventoryId === itemIdx);
  };

  useEffect(() => {
    const getMetadata = async () => {
      const meta = getGreatness(props.loot.id);
      meta.unclaimedMana = mappedProperties.reduce((acc, item, idx) => {
        acc[item] = isManaUnClaimed(idx);
        return acc;
      }, {} as any);
      setMetaData(getGreatness(props.loot.id));
    };

    if (props.loot.id) {
      getMetadata();
    }
  }, [props.loot.id]);

  return (
    <div className="z-10 w-full h-auto p-1 text-white rounded-xl">
      {props.loading ? (
        <div className="">
          <div className="w-full h-64 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 rounded bg-white/40 animate-pulse" />
        </div>
      ) : (
        <div className="px-4 py-2 pb-4 rounded bg-black/60">
          <div className=" sm:text-2xl">
            <div className="flex flex-col flex-wrap justify-between my-4 rounded sm:flex-row ">
              <h3>
                Bag # <span className="font-semibold ">{props.loot.id}</span>
              </h3>
              {props.loot.currentOwner && <h3>{ensData.displayName}</h3>}
              {props.flyto && (
                <div className="self-center text-lg">
                  <Button
                    className={
                      'bg-white/20 rounded px-4 uppercase hover:bg-white/40'
                    }
                    onClick={() => {
                      gotoAssetId(props.loot.id, 'loot');
                    }}
                  >
                    fly to
                  </Button>
                </div>
              )}
            </div>
            <div className="flex justify-between py-1 text-sm tracking-widest uppercase border-t border-b border-gray-500">
              <div>Manas claimed: {props.loot.manasClaimed}</div>
              <div>* mana available</div>
            </div>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="p-4 text-lg tracking-widest text-left uppercase">
                    Item
                  </th>
                  <th className="p-4 text-lg tracking-widest uppercase">
                    Greatness
                  </th>
                </tr>
              </thead>
              <tbody>
                {mappedProperties.map((item, index) => (
                  <tr key={index}>
                    <td className="pb-2">
                      <p
                        className={
                          'mt-1 flex  font-display text-[' +
                          rarityColor((props.loot as any)[item]) +
                          ']'
                        }
                      >
                        <LootItemIcon
                          className="self-center mr-4"
                          size="sm"
                          item={index.toString()}
                        />{' '}
                        <span className="self-center">
                          {(props.loot as any)[item]}
                          {metaData &&
                            (metaData as any).unclaimedMana[item] && (
                              <span className="ml-2 text-white text-green-200">
                                *
                              </span>
                            )}
                        </span>
                      </p>
                      {metaData && (metaData as any).unclaimedMana[item] && (
                        <a
                          href="https://app.genesisproject.xyz/claim"
                          className="text-xs uppercase border px-3 py-1 rounded hover:bg-white/40 transition-all duration-300"
                        >
                          distill
                        </a>
                      )}
                    </td>
                    <td className="text-center font-display">
                      {metaData
                        ? (metaData as any).greatness[item.toLowerCase()]
                        : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MarketplaceByPanel
            id={props.loot.id}
            collection="loot"
            address="0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
          />
        </div>
      )}
    </div>
  );
}
