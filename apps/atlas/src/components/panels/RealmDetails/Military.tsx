import React from 'react';
import { Squad } from '@/constants/index';
import type { GetRealmQuery } from '@/generated/graphql';
import { useGetTroopStatsQuery } from '@/generated/graphql';
import { SquadBuilder } from '@/shared/squad/Squad';

type Prop = {
  realm?: GetRealmQuery;
  squad: keyof typeof Squad;
};

const Military: React.FC<Prop> = (props) => {
  const realm = props.realm?.realm;

  const { data: troopStatsData } = useGetTroopStatsQuery();
  if (!realm) {
    return null;
  }
  const troops =
    realm.troops?.filter((squad) => squad.squadSlot === Squad[props.squad]) ??
    [];

  return (
    <>
      <div className="text-2xl font-semibold tracking-widest text-white uppercase">
        Military Strength
      </div>
      <SquadBuilder
        location={Squad[props.squad]}
        realmId={realm.realmId}
        withPurchase={true}
        troops={troops}
        troopsStats={troopStatsData?.getTroopStats}
      />
    </>
  );
};

export default Military;
