import {
  Card,
  CardTitle,
  CardStats,
  CountdownTimer,
} from '@bibliotheca-dao/ui-lib/base';
import React from 'react';
import { RealmResources } from '@/components/tables/RealmResources';
import type { GetRealmQuery } from '@/generated/graphql';
import useIsOwner from '@/hooks/useIsOwner';

type Prop = {
  realm?: GetRealmQuery;
};

const Raid: React.FC<Prop> = (props) => {
  const realm = props.realm?.realm;

  const timeAttacked = realm?.lastAttacked
    ? new Date(parseInt(realm.lastAttacked)).getTime()
    : 0;

  const time = () => {
    // TODO: Add comment as to why 1800
    return (timeAttacked + 1800).toString();
  };

  const isOwner = useIsOwner(realm?.settledOwner);

  return (
    <>
      <Card className="col-start-5 col-end-7 text-white">
        <CardTitle>Vulnerable in</CardTitle>
        <CountdownTimer date={time()} />
        <RealmResources
          loading={false}
          realm={realm!}
          showClaimable
          showRaidable
        />
      </Card>
    </>
  );
};

export default Raid;
