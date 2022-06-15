import { Button, CountdownTimer, Table } from '@bibliotheca-dao/ui-lib';
import D12 from '@bibliotheca-dao/ui-lib/icons/D12.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useContext, useState, useEffect } from 'react';
import {
  useGetRealmCombatResultQuery,
  useGetRealmQuery,
  useGetTroopStatsQuery,
} from '@/generated/graphql';
import useCombat from '@/hooks/settling/useCombat';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { getOrder, IsOwner, squadStats } from '@/shared/Getters/Realm';
import { RealmBannerHeading } from '@/shared/RealmBannerHeading';
import { dummySquad } from '@/shared/squad/DummySquad';
import { SquadBuilder } from '@/shared/squad/Squad';
import { RealmVault } from '../tables/RealmVault';
import { BasePanel } from './BasePanel';

export function CombatPanel(): ReactElement {
  const [attackId, setAttackId] = useState('5500');
  const [defendId, setDefendId] = useState('1291');

  const { selectedPanel, setModal } = useAtlasContext();
  const router = useRouter();
  const { attackingRealmId, defendingRealmId } = router.query;

  useEffect(() => {
    if (attackingRealmId) {
      setAttackId(attackingRealmId ? attackingRealmId.toString() : '5500');
    }
    if (defendingRealmId) {
      setDefendId(defendingRealmId ? defendingRealmId.toString() : '1291');
    }
  }, [attackingRealmId, defendingRealmId]);

  const { initiateCombat, combatData } = useCombat({
    token_id: parseInt(attackId),
  });
  useEffect(() => {
    if (combatData) {
      setModal({
        type: 'raid-result',
        props: { defendId, tx: combatData },
      });
    }
  }, [combatData]);

  const { data: AttackingRealm, loading: AttackingLoading } = useGetRealmQuery({
    variables: {
      id: parseInt(attackId),
    },
    skip: false,
  });

  const { data: DefendingRealm, loading: DefendingLoading } = useGetRealmQuery({
    variables: {
      id: parseInt(defendId),
    },
    skip: false,
  });

  const attackSquad =
    AttackingRealm?.getRealm?.squad?.filter((squad) => squad.squadSlot === 1) ??
    [];
  const defenseSquad =
    DefendingRealm?.getRealm?.squad?.filter((squad) => squad.squadSlot === 2) ??
    [];

  const timeAttacked = DefendingRealm?.getRealm?.lastAttacked
    ? new Date(parseInt(DefendingRealm?.getRealm?.lastAttacked)).getTime()
    : 0;

  // Replace with actual last time attacked
  const time = () => {
    const NOW_IN_MS = new Date().getTime();

    return (timeAttacked + 1800000).toString();
  };

  const { data: troopStatsData } = useGetTroopStatsQuery();

  const bannerClasses =
    'py-5 mb-4 -mx-4 text-4xl text-center text-white border-4 border-double rounded shadow-xl bg-off-200 font-lords transition-all duration-300';

  type Row = {
    stat: string;
    attacker: number;
    defender: number;
  };

  const columns = [
    { Header: 'stat', id: 1, accessor: 'stat' },
    { Header: 'attacker', id: 2, accessor: 'attacker' },
    { Header: 'defender', id: 3, accessor: 'defender' },
  ];

  const tableOptions = { is_striped: true };

  const defaultData: Row[] = [
    {
      stat: 'Vitality',
      attacker: squadStats(attackSquad).vitality,
      defender: squadStats(defenseSquad).vitality,
    },
    {
      stat: 'Attack',
      attacker: squadStats(attackSquad).attack,
      defender: squadStats(defenseSquad).attack,
    },
    {
      stat: 'Defense',
      attacker: squadStats(attackSquad).defense,
      defender: squadStats(defenseSquad).defense,
    },
    {
      stat: 'Wisdom',
      attacker: squadStats(attackSquad).wisdom,
      defender: squadStats(defenseSquad).wisdom,
    },
    {
      stat: 'Agility',
      attacker: squadStats(attackSquad).agility,
      defender: squadStats(defenseSquad).agility,
    },
  ];

  return (
    <BasePanel open={selectedPanel === 'combat'}>
      <div className="relative grid h-full grid-cols-8 gap-12">
        <div className="flex flex-col justify-around h-full col-start-1 col-end-7">
          {DefendingRealm?.getRealm?.name && (
            <RealmBannerHeading
              onSubmit={(value) => setDefendId(value)}
              realmId={parseInt(defendId)}
              order={getOrder(DefendingRealm?.getRealm)}
              title={DefendingRealm?.getRealm?.name}
            />
          )}

          <SquadBuilder
            location={2}
            flipped={true}
            realmId={parseInt(defendId)}
            withPurchase={false}
            troops={defenseSquad}
            troopsStats={troopStatsData?.getTroopStats}
          />

          <hr></hr>

          <SquadBuilder
            location={1}
            realmId={parseInt(attackId)}
            withPurchase={true}
            troops={attackSquad}
            troopsStats={troopStatsData?.getTroopStats}
          />

          {AttackingRealm?.getRealm?.name && (
            <RealmBannerHeading
              onSubmit={(value) => setAttackId(value)}
              realmId={parseInt(attackId)}
              order={getOrder(AttackingRealm?.getRealm)}
              title={AttackingRealm?.getRealm?.name}
            />
          )}
        </div>
        <div className="col-start-7 col-end-9 pt-4 pb-4 border-4 rounded-md rounded-b-full shadow-2xl bg-stone-400 borer-double">
          <div className={bannerClasses}>
            {' '}
            <span>Raidable Vault</span>
          </div>
          <div className="px-4">
            <CountdownTimer date={time()} />
          </div>

          <div className="px-4">
            {DefendingRealm && !DefendingLoading && (
              <RealmVault
                realm={DefendingRealm?.getRealm}
                loading={AttackingLoading}
              />
            )}
          </div>

          <div className={bannerClasses}>battle stats</div>
          <div className="flex">
            <div className="w-full my-4 shadow-inner bg-gray-800/60">
              <Table
                columns={columns}
                data={defaultData}
                options={tableOptions}
              />
            </div>
          </div>
          <div className="w-full px-4 mb-4">
            {/* {IsOwner(AttackingRealm?.getRealm?.ownerL2) && ( */}
            <Button
              disabled={IsOwner(AttackingRealm?.getRealm?.ownerL2)}
              onClick={() => initiateCombat(parseInt(defendId), 1)}
              className="w-full"
              variant="attack"
            >
              Raid Vault
            </Button>
            {/* )} */}
          </div>
          {/* <Button
            onClick={() => {
              setModal({
                type: 'raid-result',
                props: {
                  defendId: 1291,
                  tx: '0x6563df76cbee8270f502b34b81c008e36c2f8916163525658df5ebd052260b9',
                },
              });
            }}
          >
            Open Modal
          </Button> */}
          {/* <div className="px-4">
            {DefendingRealm && !DefendingLoading && (
              <RealmVault
                realm={DefendingRealm?.getRealm}
                loading={AttackingLoading}
              />
            )}
          </div> */}
          {/* <div className="flex w-full px-4 pt-10">
            <Button variant="primary" className="w-full">
              Success
            </Button>
          </div> */}
        </div>
      </div>
    </BasePanel>
  );
}
