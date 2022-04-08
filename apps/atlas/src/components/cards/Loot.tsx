import { Button } from '@bibliotheca-dao/ui-lib';
import { rarityDescription, rarityColor } from 'loot-rarity';
import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { useUIContext } from '@/hooks/useUIContext';
import getGreatness from '@/services/getGreatness';
import { LootItemIcon } from '@/shared/LootItemIcon';
import { MarketplaceByPanel } from '@/shared/MarketplaceByPanel';
import { shortenAddress } from '@/util/formatters';
import type { LootProps } from '../../types';

const variantMaps: any = {
  small: { heading: 'lg:text-4xl', regions: 'lg:text-xl' },
};

export function Loot(props: LootProps): ReactElement {
  const image = props.loot.id;
  const [metaData, setMetaData] = useState(null);
  const { gotoAssetId } = useUIContext();

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

  useEffect(() => {
    const getMetadata = async () => {
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
        <div className="px-4 py-2 bg-black/60 rounded">
          <div className=" sm:text-2xl">
            <div className="flex flex-col flex-wrap justify-between my-4 rounded sm:flex-row ">
              <h3>
                Bag # <span className="font-semibold ">{props.loot.id}</span>
              </h3>
              {props.loot.currentOwner && (
                <h3>👑 {shortenAddress(props.loot.currentOwner.address)}</h3>
              )}
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
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="p-4 text-left uppercase tracking-widest text-lg">
                    Item
                  </th>
                  <th className="p-4 uppercase tracking-widest text-lg">
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
                        </span>
                      </p>
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
