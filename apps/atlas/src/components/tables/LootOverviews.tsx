import { Button } from '@bibliotheca-dao/ui-lib';
import { rarityColor } from 'loot-rarity';
import { useLootContext } from '@/context/LootContext';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import { LootItemIcon } from '@/shared/LootItemIcon';
import type { Loot } from '@/types/index';

interface LootOverviewsProps {
  bags: Loot[];
}

export function LootOverviews(props: LootOverviewsProps) {
  const { account } = useWalletContext();
  const { openDetails, gotoAssetId, togglePanelType } = useAtlasContext();
  const {
    state: { favouriteLoot },
    actions,
  } = useLootContext();

  const isYourLoot = (loot: Loot) =>
    account && account === loot.currentOwner?.address?.toLowerCase();

  const isFavourite = (loot: Loot) => favouriteLoot.indexOf(loot.id) > -1;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {props.bags &&
        props.bags.map((loot: Loot, index) => (
          <div key={index} className="w-full rounded">
            <div className="w-full p-2 rounded-t bg-black/70 font-display">
              {[
                loot.weapon,
                loot.chest,
                loot.head,
                loot.waist,
                loot.foot,
                loot.hand,
                loot.neck,
                loot.ring,
              ]?.map((itemName, index) => {
                return (
                  <div className="flex px-2 my-1 font-bold" key={index}>
                    <LootItemIcon
                      className="self-center"
                      size="sm"
                      item={index.toString()}
                    />{' '}
                    <span
                      className={
                        'mt-1 flex self-center ml-4  font-display text-[' +
                        rarityColor(itemName) +
                        ']'
                      }
                    >
                      {itemName}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full p-3 text-white bg-black/60">
              <div className="flex self-center w-full">
                <h3 className="mb-3 ml-4">Bag #{loot.id}</h3>
                <div className="ml-auto"></div>
              </div>
            </div>
            <div className="flex justify-center w-full p-2 space-x-2 rounded-b bg-gray-600/70">
              {' '}
              <Button
                onClick={() => {
                  togglePanelType('loot');
                  gotoAssetId(loot.id, 'loot');
                }}
                variant="primary"
                size="sm"
                className="w-full uppercase"
              >
                fly to
              </Button>
              <Button
                onClick={() => openDetails('loot', loot.id)}
                variant="secondary"
                size="sm"
                className="w-full uppercase"
              >
                details
              </Button>
              {!isFavourite(loot) && (
                <Button
                  className="text-xs"
                  variant="secondary"
                  onClick={() => actions.addFavouriteLoot(loot.id)}
                >
                  add
                </Button>
              )}
              {isFavourite(loot) && (
                <Button
                  className="text-xs"
                  variant="secondary"
                  onClick={() => actions.removeFavouriteLoot(loot.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
