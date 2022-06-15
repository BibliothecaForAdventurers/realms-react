import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import { RaidResults } from '@/components/tables/RaidResults';
import { RealmCombatHistory } from '@/components/tables/RealmCombatHistory';
import {
  useGetTroopStatsQuery,
  useGetRealmsQuery,
  useGetRealmHistoryQuery,
} from '@/generated/graphql';
interface RealmResultsPanelProps {
  defendId: number;
  tx?: string;
}

export function RaidResultsPanel({ defendId, tx }: RealmResultsPanelProps) {
  const variables = useMemo(() => {
    const filter = { realmId: { in: [] } };

    return {
      filter,
    };
  }, [defendId]);
  const { data: realmData } = useGetRealmsQuery({ variables });

  const defendingRealmData = realmData?.getRealms.find(
    (realm) => realm.realmId === defendId
  );
  const attackingRealmData = realmData?.getRealms.find(
    (realm) => realm.realmId === defendId
  );

  const attackSquad =
    attackingRealmData?.squad?.filter((squad) => squad.squadSlot === 1) ?? [];
  const defenseSquad =
    defendingRealmData?.squad?.filter((squad) => squad.squadSlot === 2) ?? [];

  const getTrait = (realm: any, trait: string) => {
    return realm?.traits?.find((o) => o.type === trait)
      ? realm.traits?.find((o) => o.type === trait).qty
      : '0';
  };

  const timeAttacked = defendingRealmData?.lastAttacked
    ? new Date(parseInt(defendingRealmData.lastAttacked)).getTime()
    : 0;

  // Replace with actual last time attacked
  const time = () => {
    const NOW_IN_MS = new Date().getTime();

    return (timeAttacked + 1800).toString();
  };

  return (
    <div className="absolute z-20 grid w-full h-full grid-cols-6 gap-8 p-6 overflow-auto bg-cover bg-hero">
      <div className="col-start-1 col-end-5">
        {tx ? (
          <div>
            <h2>Raid Result</h2>
            <RaidResults defendId={defendId} tx={tx} />
          </div>
        ) : (
          <div>
            <h2 className="mb-4">Realm #{defendId} Combat Results</h2>
            <RealmCombatHistory realmId={defendId} />
          </div>
        )}
      </div>
    </div>
  );
}
