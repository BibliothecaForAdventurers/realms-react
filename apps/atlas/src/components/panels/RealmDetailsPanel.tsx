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
import useRealmDetailHotkeys from '@/hooks/settling/useRealmDetailHotkeys';
import { RealmOwner, RealmStatus, TraitTable } from '@/shared/Getters/Realm';
import { RealmBannerHeading } from '@/shared/RealmBannerHeading';
import { dummySquad, dummyDefenceSquad } from '@/shared/squad/DummySquad';
import { SquadBuilder } from '@/shared/squad/Squad';
import { shortenAddress } from '@/util/formatters';
import { findResourceName } from '@/util/resources';
import AtlasSidebar from '../sidebars/AtlasSideBar';
import { RealmBuildings } from '../tables/RealmBuildings';
import Food from './RealmDetails/Food';
import Harvests from './RealmDetails/Harvests';
import Military from './RealmDetails/Military';
import Raid from './RealmDetails/Raids';
import Statistics from './RealmDetails/Statistics';
import RealmToolbar from './RealmDetails/Toolbar';

interface RealmDetailsPanelProps {
  realmId: number;
}

export function RealmDetailsPanel({ realmId }: RealmDetailsPanelProps) {
  const [id, setId] = useState(realmId);
  const router = useRouter();
  const { data: realmData } = useGetRealmQuery({
    variables: { id: realmId },
    pollInterval: 5000,
  });

  const realm = realmData?.realm;

  const { subview, set } = useRealmDetailHotkeys();
  // Replace with actual last time attacked

  const pushPage = (value) => {
    setId(parseInt(value));
    router.push('/realm/' + value);
  };

  return (
    <div className="absolute z-20 grid w-full h-full grid-cols-6 gap-8 overflow-auto bg-cover bg-hero">
      <div className="col-start-1 col-end-5 relative">
        <RealmBannerHeading
          onSubmit={(value) => pushPage(parseInt(value))}
          key={realm?.realmId ?? ''}
          order={realm?.orderType?.replaceAll('_', ' ').toLowerCase() ?? ''}
          title={realm?.name ?? ''}
          realmId={realmId}
        />
        <div className="relative w-full">
          <Image
            src={`https://d23fdhqc1jb9no.cloudfront.net/renders_webp/${realmId}.webp`}
            alt="map"
            className="w-full -scale-x-100"
            width={500}
            height={320}
            layout={'responsive'}
          />
        </div>

        <AtlasSidebar isOpen={!!subview}>
          <>
            <h2>{subview}</h2>
            {subview == 'Raid' ? <Raid realm={realmData} /> : null}
            {subview == 'Harvests' && <Harvests realm={realmData} />}
            {subview == 'Food' ? <Food realm={realmData} /> : null}
            {subview == 'AttackingArmy' && (
              <Military squad="Attack" realm={realmData} />
            )}
            {subview == 'DefendingArmy' && (
              <Military squad="Defend" realm={realmData} />
            )}
            {subview == 'Statistics' && <Statistics realm={realmData} />}
          </>
        </AtlasSidebar>
        <RealmToolbar
          onSetSubview={(s) => set(s)}
          className="absolute bottom-0"
        />
        {/*
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
          </Card>
          <Card className="col-start-5 col-end-7">
            <CardTitle>Realm State</CardTitle>
            {realm && (
              <CardStats className="text-2xl">{RealmStatus(realm)}</CardStats>
            )}
          </Card>
          <Card className="col-start-5 col-end-7 text-white">
            <CardTitle>Vulnerable in</CardTitle>
            <CountdownTimer date={time()} />
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
          </Card>
          <Card className="col-start-3 col-end-4 ">
            <CardTitle>Culture</CardTitle>
            <CardStats className="text-4xl">{getCulture()}</CardStats>
          </Card>
          <Card className="col-start-4 col-end-5 ">
            <CardTitle>Food</CardTitle>
            <CardStats className="text-4xl">{getFood()}</CardStats>
          </Card>
          <Card className="col-start-5 col-end-7 ">
            <CardTitle>Population</CardTitle>
            <CardStats className="text-4xl">{getPopulation()}</CardStats>
          </Card>
          <Card className="col-start-1 col-end-7 ">
            <CardTitle>Buildings</CardTitle>
            {realm && <RealmBuildings realm={realm} loading={false} />}
          </Card>
        </div>
        */}
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
