import { Button, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import { useCryptContext } from '@/context/CryptContext';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import type { Crypt } from '@/types/index';
import {
  environments,
  findEnvironment,
  isLegendary,
  legendaryColourClass,
} from '@/util/cryptsEnvironments';

interface CryptOverviewsProps {
  dungeons: Crypt[];
}

export function CryptsOverviews(props: CryptOverviewsProps) {
  const { account } = useWalletContext();
  const { openDetails, gotoAssetId, togglePanelType } = useAtlasContext();
  const {
    state: { favouriteCrypt },
    actions,
  } = useCryptContext();

  const isYourCrypt = (crypt: Crypt) =>
    account && account === crypt.currentOwner?.address?.toLowerCase();

  const isFavourite = (crypt: Crypt) => favouriteCrypt.indexOf(crypt.id) > -1;

  return (
    <div>
      {props.dungeons &&
        props.dungeons.map((crypt: Crypt, index) => (
          <div
            key={index}
            className="flex flex-wrap w-full h-auto max-w-full mb-4 overflow-x-auto rounded justify-evenly"
          >
            <div className="flex w-full p-2 bg-black/50">
              <div className="flex self-center w-full">
                <h3 className={`px-2 rounded py-1`}>
                  <span>{crypt.id}</span> | {crypt.name}
                </h3>
              </div>
            </div>
            <div className="flex w-1/3 px-6 sm:w-3/12 bg-black/40 ">
              <div className="self-center my-1">
                <ResourceIcon
                  resource={environments[crypt.environment]?.name}
                  size="md"
                  label
                />
              </div>
            </div>
            <div className="grid items-center justify-between w-2/3 grid-cols-2 p-6 sm:w-6/12 bg-black/70">
              <div className="my-1 font-bold">Environment</div>
              <div
                className={`px-2 rounded py-0.5 ${
                  findEnvironment(crypt.environment)?.colourClass.main
                }`}
              >
                {' '}
                {findEnvironment(crypt.environment)?.name}
              </div>
              <div className="my-1 font-bold">Size</div>
              <div>
                {crypt.size} x {crypt.size}
              </div>
              <div className="my-1 font-bold">Doors</div>
              <div>{crypt.numPoints}</div>
              <div className="my-1 font-bold">Points</div>
              <div>{crypt.numDoors}</div>
              {/* <div className="my-1 font-bold">Legendary</div>
              <div>{crypt}</div> */}
            </div>
            <div className="flex justify-center w-full px-6 py-4 space-x-2 sm:flex-col sm:w-3/12 sm:py-0 sm:space-x-0 sm:space-y-3 bg-gray-600/70">
              {' '}
              <Button
                onClick={() => {
                  togglePanelType('crypt');
                  gotoAssetId(crypt.id, 'crypt');
                }}
                variant="primary"
                size="xs"
                className="w-full "
              >
                fly to
              </Button>
              <Button
                onClick={() => openDetails('crypt', crypt.id)}
                variant="secondary"
                size="xs"
                className="w-full "
              >
                details
              </Button>
              {!isFavourite(crypt) && (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => actions.addFavouriteCrypt(crypt.id)}
                >
                  Add
                </Button>
              )}
              {isFavourite(crypt) && (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => actions.removeFavouriteCrypt(crypt.id)}
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
