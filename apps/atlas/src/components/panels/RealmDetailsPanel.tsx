import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardStats,
  CardIcon,
  Donut,
  CountdownTimer,
} from '@bibliotheca-dao/ui-lib';
import { Button, OrderIcon, ResourceIcon } from '@bibliotheca-dao/ui-lib/base';
import Helm from '@bibliotheca-dao/ui-lib/icons/helm.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RealmCard } from '@/components/cards/RealmCard';
import { RealmHistory } from '@/components/tables/RealmHistory';
import { RealmResources } from '@/components/tables/RealmResources';
import type { RealmFragmentFragment } from '@/generated/graphql';
import { useGetTroopStatsQuery, useGetRealmQuery } from '@/generated/graphql';
import { RealmOwner, RealmStatus, TraitTable } from '@/shared/Getters/Realm';
import { RealmBannerHeading } from '@/shared/RealmBannerHeading';
import { dummySquad, dummyDefenceSquad } from '@/shared/squad/DummySquad';
import { SquadBuilder } from '@/shared/squad/Squad';
import { shortenAddress } from '@/util/formatters';
import { findResourceName } from '@/util/resources';
import { RealmBuildings } from '../tables/RealmBuildings';

interface RealmDetailsPanelProps {
  realmId: number;
}

export function RealmDetailsPanel({ realmId }: RealmDetailsPanelProps) {
  const [squad, setSquad] = useState(false);
  const [id, setId] = useState(realmId);
  const router = useRouter();
  const { data: realmData } = useGetRealmQuery({
    variables: { id: realmId },
    pollInterval: 5000,
  });

  const realm = realmData?.getRealm;
  const { data: troopStatsData } = useGetTroopStatsQuery();

  const attackSquad =
    realm?.squad?.filter((squad) => squad.squadSlot === 1) ?? [];
  const defenseSquad =
    realm?.squad?.filter((squad) => squad.squadSlot === 2) ?? [];

  const getTrait = (realm: any, trait: string) => {
    return realm?.traits?.find((o) => o.type === trait)
      ? realm.traits?.find((o) => o.type === trait).qty
      : '0';
  };

  const timeAttacked = realm?.lastAttacked
    ? new Date(parseInt(realm.lastAttacked)).getTime()
    : 0;

  // Replace with actual last time attacked
  const time = () => {
    const NOW_IN_MS = new Date().getTime();

    return (timeAttacked + 1800).toString();
  };

  const pushPage = (value) => {
    setId(parseInt(value));
    router.push('/realm/' + value);
  };

  console.log(realmData);

  const getPopulation = () => {
    return realmData?.getRealm?.buildings
      ?.map((a) => a.population)
      .reduce((prev, curr) => prev + curr, 0);
  };

  const getFood = () => {
    return realmData?.getRealm?.buildings
      ?.map((a) => a.food)
      .reduce((prev, curr) => prev + curr, 0);
  };

  const getCulture = () => {
    return realmData?.getRealm?.buildings
      ?.map((a) => a.culture)
      .reduce((prev, curr) => prev + curr, 0);
  };

  return (
    <div className="absolute z-20 grid w-full h-full grid-cols-6 gap-8 p-6 overflow-auto bg-cover bg-hero">
      <div className="col-start-1 col-end-5">
        <RealmBannerHeading
          onSubmit={(value) => pushPage(parseInt(value))}
          key={realm?.realmId ?? ''}
          order={realm?.orderType?.replaceAll('_', ' ').toLowerCase() ?? ''}
          title={realm?.name ?? ''}
          realmId={realmId}
        />

        <div className="grid grid-flow-col grid-cols-6 gap-6 py-4">
          <div className="col-start-1 col-end-5 row-span-3">
            <Image
              src={`https://d23fdhqc1jb9no.cloudfront.net/renders_webp/${realmId}.webp`}
              alt="map"
              className="w-full mt-4 rounded-xl -scale-x-100"
              width={500}
              height={320}
              layout={'responsive'}
            />
          </div>
          <Card className="col-start-5 col-end-7">
            <CardTitle>Owner</CardTitle>
            <CardStats className="text-2xl">
              {shortenAddress(RealmOwner(realm as RealmFragmentFragment))}
            </CardStats>
            {/* <CardIcon /> */}
          </Card>
          <Card className="col-start-5 col-end-7">
            <CardTitle>Realm State</CardTitle>
            {realm && (
              <CardStats className="text-2xl">{RealmStatus(realm)}</CardStats>
            )}
          </Card>
          <Card className="col-start-5 col-end-7 text-white">
            <CardTitle>Vulnerable in</CardTitle>
            {/* <CardStats className="text-2xl">{date.toDateString()}</CardStats> */}
            {/* <div className='flex justify-around w-full my-4 text-white'>
              
              <Donut label={24 - hoursAgoAttack} className='mx-auto stroke-green-400' radius={50} stroke={2} progress={getProgress()}/>
              
            </div> */}
            <CountdownTimer date={time()} />
            {/* <CardIcon /> */}
          </Card>
          <Card className="col-start-1 col-end-3 ">
            <CardTitle>Traits</CardTitle>
            <div className="w-full my-2 text-white">
              <TraitTable
                trait="Region"
                traitAmount={getTrait(realm, 'Region')}
              />
            </div>
            <div className="w-full my-2 text-white">
              <TraitTable trait="City" traitAmount={getTrait(realm, 'City')} />
            </div>
            <div className="w-full my-2 text-white">
              <TraitTable
                trait="Harbor"
                traitAmount={getTrait(realm, 'Harbor')}
              />
            </div>
            <div className="w-full my-2 text-white">
              <TraitTable
                trait="River"
                traitAmount={getTrait(realm, 'River')}
              />
            </div>
          </Card>
          <Card className="col-start-3 col-end-7 ">
            <CardTitle>Resources</CardTitle>
            {realm && <RealmResources realm={realm} loading={false} />}
          </Card>

          {/* {realmData && realmData.getRealm && (
              <RealmCard realm={realmData!.getRealm} loading={false} />
            )} */}

          <Card className="col-start-1 col-end-7">
            <div className="flex justify-between w-full mb-10">
              <div className="text-2xl font-semibold tracking-widest text-white uppercase">
                Military Strength
              </div>
              <div className="text-xl font-semibold tracking-widest text-white uppercase ">
                {squad ? <span>Attacking</span> : <span>Defending</span>} Squad
                <Button
                  className="ml-4"
                  variant="secondary"
                  size="xs"
                  onClick={() => setSquad(!squad)}
                >
                  change
                </Button>
              </div>
            </div>
            {squad ? (
              <SquadBuilder
                location={1}
                realmId={realmId}
                withPurchase={true}
                troops={attackSquad}
                troopsStats={troopStatsData?.getTroopStats}
              />
            ) : (
              <SquadBuilder
                location={2}
                realmId={realmId}
                withPurchase={true}
                troops={defenseSquad}
                troopsStats={troopStatsData?.getTroopStats}
              />
            )}
          </Card>
          <Card className="col-start-1 col-end-3 ">
            <CardTitle>Happiness</CardTitle>
            <CardStats className="text-4xl">100</CardStats>
            {/* <CardIcon /> */}
          </Card>
          <Card className="col-start-3 col-end-4 ">
            <CardTitle>Culture</CardTitle>
            <CardStats className="text-4xl">{getCulture()}</CardStats>
            {/* <CardIcon /> */}
          </Card>
          <Card className="col-start-4 col-end-5 ">
            <CardTitle>Food</CardTitle>
            <CardStats className="text-4xl">{getFood()}</CardStats>
            {/* <CardIcon /> */}
          </Card>
          <Card className="col-start-5 col-end-7 ">
            <CardTitle>Population</CardTitle>
            <CardStats className="text-4xl">{getPopulation()}</CardStats>
            {/* <CardIcon /> */}
          </Card>
          <Card className="col-start-1 col-end-7 ">
            <CardTitle>Buildings</CardTitle>
            {realm && <RealmBuildings realm={realm} loading={false} />}
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-6 col-start-5 col-end-7">
        <div className="col-start-1 col-end-7">
          <div className="w-full ">
            <h2 className="text-center text-white font-lords">History</h2>
            <RealmHistory realmId={realmId} />
          </div>
        </div>
      </div>
    </div>
  );
}
