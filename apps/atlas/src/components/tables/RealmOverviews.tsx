import { Button, OrderIcon, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import { useStarknet } from '@starknet-react/core';
import clsx from 'clsx';
import { useRealmContext } from '@/context/RealmContext';
import type { RealmFragmentFragment } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import { RealmStatus, squadStats } from '@/shared/Getters/Realm';
import { findResourceName } from '@/util/resources';
interface RealmOverviewsProps {
  realms: RealmFragmentFragment[];
  isYourRealms?: boolean;
}

const JOURNEY_1_ADDRESS = '0x17963290db8c30552d0cfa2a6453ff20a28c31a2';
const JOURNEY_2_ADDRESS = '0xcdfe3d7ebfa793675426f150e928cd395469ca53';

export function RealmOverviews(props: RealmOverviewsProps) {
  const { account } = useWalletContext();
  const { account: starkAccount } = useStarknet();
  const {
    openDetails,
    toggleMenuType,
    selectedMenuType,
    gotoAssetId,
    togglePanelType,
  } = useAtlasContext();
  const {
    state: { favouriteRealms },
    actions,
  } = useRealmContext();

  const isBridgedViaGalleon = (realm: RealmFragmentFragment) =>
    realm.owner === JOURNEY_1_ADDRESS;
  const isBridgedViaCarrack = (realm: RealmFragmentFragment) =>
    realm.owner === JOURNEY_2_ADDRESS;

  const isYourRealm = (realm: RealmFragmentFragment) =>
    (account &&
      (account.toLowerCase() === realm.owner ||
        account.toLowerCase() === realm.bridgedOwner)) ||
    (starkAccount &&
      (starkAccount.toLowerCase() === realm.ownerL2 ||
        starkAccount.toLowerCase() === realm.settledOwner));

  const openRealmDetails = (realmId: number) => {
    openDetails('realm', realmId.toString());
    if (selectedMenuType !== 'realm') {
      toggleMenuType('realm');
    }
  };

  const isFavourite = (realm: RealmFragmentFragment) =>
    favouriteRealms.indexOf(realm.realmId) > -1;
  let bridgeRow;

  if (props.isYourRealms) {
    bridgeRow = (
      <div className={`justify-between mb-3`}>
        <div className="flex">
          You have X Realms on L1 (Ethereum)
          <Button
            variant="primary"
            size="sm"
            className={clsx('')}
            onClick={() => toggleMenuType('bridgeRealms')}
          >
            Bridge L1 {'><'} L2
          </Button>
        </div>
        <div className="flex">
          You have X unsettled Realms
          <Button
            variant="primary"
            size="sm"
            className=""
            onClick={() => toggleMenuType('settleRealms')}
          >
            Settle Realms
          </Button>
        </div>
      </div>
    );
  }

  console.log(props.realms);
  return (
    <div>
      {/* {bridgeRow} */}

      {props.realms &&
        props.realms.map((realm: RealmFragmentFragment, index) => (
          <div
            key={index}
            className="flex flex-wrap w-full h-auto max-w-full mb-2 rounded justify-evenly"
          >
            {realm?.wonder && (
              <div className="w-full p-2 text-xl font-semibold text-center text-gray-200 uppercase border-gray-500 rounded-t shadow-inner tracking-veryWide bg-black/30">
                {realm?.wonder}
              </div>
            )}
            <div className="flex w-full p-2 text-white shadow-inner rounded-t-l bg-black/80">
              <h3 className="self-center mb-1 ml-4 font-lords">
                <span className="mr-1 text-gray-400 font-body">
                  {realm.realmId} |{' '}
                </span>
                {realm.name}
              </h3>

              {/* <h4 className="self-center hidden p-1 px-4 mx-auto text-xs text-gray-400 border border-gray-400 rounded sm:block">
                rank: {realm.rarityRank}
              </h4> */}
              <h4 className="self-center hidden p-1 px-4 mx-auto text-xs text-gray-400 border rounded border-blue-100/20 sm:block">
                {RealmStatus(realm)}
              </h4>

              <div className="flex ml-auto ">
                <OrderIcon
                  withTooltip
                  className="self-center mx-3"
                  size={'md'}
                  order={realm.orderType.toLowerCase()}
                />
              </div>
            </div>
            <div className="flex w-1/2 px-6 shadow-inner sm:w-1/3 bg-black/50">
              <div className="self-center">
                {realm.resources?.map((resource, index) => {
                  const info = findResourceName(resource.resourceId);
                  return (
                    <div className="flex my-4 font-bold " key={index}>
                      <ResourceIcon
                        size="sm"
                        resource={info?.trait?.replace('_', '') as string}
                      />{' '}
                      <span className="ml-4 uppercase tracking-veryWide">
                        {info?.trait}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="flex w-1/2 px-6 shadow-inner sm:w-1/3 bg-gray-800/60">
              {' '}
              <div className="self-center w-full">
                {realm.traits?.map((trait, index) => {
                  return (
                    <div className="flex my-4 font-bold " key={index}>
                      <span className="ml-4 uppercase tracking-veryWide">
                        {trait.type}
                      </span>
                      <span className="self-end px-4 ml-auto uppercase tracking-veryWide">
                        {trait.qty}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div> */}
            <div className="flex w-1/2 px-6 shadow-inner sm:w-1/3 bg-gray-800/60">
              <div className="self-center w-full font-semibold tracking-widest uppercase">
                <div className="flex justify-between ">
                  Vitality: <span> {squadStats(realm.squad).vitality}</span>
                </div>
                <div className="flex justify-between">
                  Attack: <span>{squadStats(realm.squad).attack}</span>
                </div>
                <div className="flex justify-between">
                  Defense: <span>{squadStats(realm.squad).defense}</span>
                </div>
                <div className="flex justify-between">
                  Wisdom: <span>{squadStats(realm.squad).wisdom}</span>
                </div>
                <div className="flex justify-between">
                  Agility: <span>{squadStats(realm.squad).agility}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full px-6 space-x-2 shadow-inner sm:flex-col sm:w-1/3 sm:py-4 sm:space-x-0 sm:space-y-3 bg-gray-600/70">
              {' '}
              <Button
                onClick={() => {
                  togglePanelType('realm');
                  gotoAssetId(realm.realmId, 'realm');
                }}
                variant="secondary"
                size="xs"
                className="w-full uppercase"
              >
                fly to
              </Button>
              {isYourRealm(realm) && (
                <div>
                  {RealmStatus(realm) === 'Layer 1' && (
                    <Button
                      size="xs"
                      variant="secondary"
                      className="w-full uppercase"
                      onClick={() => toggleMenuType('bridgeRealms')}
                    >
                      Bridge Realm
                    </Button>
                  )}
                  {RealmStatus(realm) === 'Unsettled L2' && (
                    <Button
                      size="xs"
                      variant="secondary"
                      className="w-full uppercase"
                      onClick={() => toggleMenuType('settleRealms')}
                    >
                      Settle Realm
                    </Button>
                  )}
                </div>
              )}
              <Button
                onClick={() => openRealmDetails(realm.realmId)}
                variant="secondary"
                size="xs"
                className="w-full "
              >
                quick view
              </Button>
              {!isFavourite(realm) && (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => actions.addFavouriteRealm(realm.realmId)}
                >
                  Add to favs
                </Button>
              )}{' '}
              {isFavourite(realm) && (
                <Button
                  size="xs"
                  variant="secondary"
                  className="w-full"
                  onClick={() => actions.removeFavouriteRealm(realm.realmId)}
                >
                  Remove from favs
                </Button>
              )}
              <hr />
              <Button
                href={`/realm/${realm.realmId}`}
                variant="primary"
                size="xs"
                className="w-full "
              >
                {isYourRealm(realm) ? 'manage' : 'details'}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
