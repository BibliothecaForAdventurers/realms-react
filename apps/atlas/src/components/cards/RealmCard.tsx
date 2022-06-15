import { OrderIcon, Tabs, ResourceIcon, Button } from '@bibliotheca-dao/ui-lib';
import Image from 'next/image';
import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import { number } from 'starknet';
import { RealmBuildings } from '@/components/tables/RealmBuildings';
import { RealmHistory } from '@/components/tables/RealmHistory';
import { RealmResources } from '@/components/tables/RealmResources';
import { RealmTroops } from '@/components/tables/RealmTroops';
import type { RealmFragmentFragment } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useEnsResolver } from '@/hooks/useEnsResolver';
import { DownloadAssets } from '@/shared/DownloadAssets';
import { RealmStatus, TraitTable } from '@/shared/Getters/Realm';
import { MarketplaceByPanel } from '@/shared/MarketplaceByPanel';
import { findResourceName } from '@/util/resources';
import { Realm } from '../../types';
import type { RealmsCardProps } from '../../types';

const variantMaps: any = {
  small: { heading: 'lg:text-4xl', regions: 'lg:text-xl' },
};

function Overview(props: RealmsCardProps): ReactElement {
  const { gotoAssetId } = useAtlasContext();
  const regions = props.realm.traits?.find((o) => o.type === 'Region');
  const cities = props.realm.traits?.find((o) => o.type === 'City');
  const rivers = props.realm.traits?.find((o) => o.type === 'River');
  const harbors = props.realm.traits?.find((o) => o.type === 'Harbor');

  return (
    <div>
      {/* <div>
        <div className="flex justify-between">
          {!props.realm?.owner && (
            <div>
              <button
                className={
                  'bg-white/20 rounded px-4 uppercase hover:bg-white/40'
                }
                onClick={() => {
                  gotoAssetId(props.realm?.realmId as number, 'realm');
                }}
              >
                fly to
              </button>
            </div>
          )}
        </div>
      </div> */}
      <div className="flex flex-wrap mb-2 tracking-widest uppercase">
        {props.realm.resources?.map((re, index) => (
          <div key={index} className="flex mb-4 mr-4 text-xl">
            <ResourceIcon
              resource={
                findResourceName(re.resourceId)?.trait.replace(' ', '') || ''
              }
              size="md"
            />

            <span className="self-center ml-4">
              {findResourceName(re.resourceId)?.trait}
            </span>
          </div>
        ))}
      </div>

      <div
        className={
          `grid grid-cols-2 gap-4  w-full uppercase font-display ` +
          (props.size ? variantMaps[props.size]?.regions : '')
        }
      >
        <TraitTable trait="Region" traitAmount={regions?.qty} />
        <TraitTable trait="City" traitAmount={cities?.qty} />
        <TraitTable trait="Harbor" traitAmount={harbors?.qty} />
        <TraitTable trait="River" traitAmount={rivers?.qty} />
      </div>
      <MarketplaceByPanel
        id={props.realm.realmId.toString()}
        address="0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d"
      />
      <DownloadAssets id={props.realm.realmId}></DownloadAssets>
    </div>
  );
}

export function RealmCard(props: RealmsCardProps): ReactElement {
  const ensData = useEnsResolver(props.realm?.owner as string);

  const tabs = useMemo(
    () => [
      {
        label: 'Overview',
        component: <Overview {...props} />,
      },
      {
        label: 'Resources',
        component: <RealmResources {...props} />,
      },
      // {
      //   label: 'Troops',
      //   component: <RealmTroops />,
      // },
      // {
      //   label: 'Buildings',
      //   component: <RealmBuildings {...props} />,
      // },
      {
        label: 'History',
        component: <RealmHistory realmId={props.realm.realmId} />,
      },
    ],
    [props.realm?.realmId]
  );
  return (
    <div className="z-10 w-full h-auto p-1 text-white rounded-xl">
      {props.loading ? (
        <div className="">
          <div className="w-full h-64 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 rounded bg-white/40 animate-pulse" />
        </div>
      ) : (
        <div>
          {props.realm?.wonder && (
            <div className="w-full p-4 text-2xl font-semibold text-center text-gray-200 uppercase border-4 border-gray-500 rounded shadow-inner tracking-veryWide bg-white/10">
              {props.realm?.wonder}
            </div>
          )}
          <div className="w-auto">
            <Image
              src={`https://d23fdhqc1jb9no.cloudfront.net/renders_webp/${props.realm.realmId}.webp`}
              alt="map"
              className="w-full mt-4 rounded-xl -scale-x-100"
              width={500}
              height={320}
              layout={'responsive'}
            />
          </div>
          {RealmStatus(props.realm)}
          <div className="flex">
            <OrderIcon size="md" order={props.realm.orderType.toLowerCase()} />
            <h2
              className={
                `ml-4 self-center` +
                (props.size ? variantMaps[props.size]?.heading : '')
              }
            >
              {props.realm.name}{' '}
            </h2>
            {props.realm.owner && (
              <h3 className="self-center my-2 ml-auto">
                {ensData.displayName}
              </h3>
            )}
          </div>

          <Tabs variant="primary">
            <Tabs.List className="">
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.label} className="uppercase">
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <div className="flex flex-col justify-between px-4 py-2 mb-2 uppercase rounded shadow-inner sm:flex-row bg-black/20">
              <span>
                Id:<span className="">{props.realm.realmId}</span>
              </span>
              <span>
                Rank:
                <span className="">{props.realm.rarityRank}</span>
              </span>
              <span>
                Score:
                <span className="">{props.realm.rarityScore}</span>
              </span>
            </div>
            <div className="px-5 pb-5 rounded shadow-inner bg-black/10">
              <Tabs.Panels>
                {tabs.map((tab) => (
                  <Tabs.Panel key={tab.label}>{tab.component}</Tabs.Panel>
                ))}
              </Tabs.Panels>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
}
