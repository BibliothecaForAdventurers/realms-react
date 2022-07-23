import React from 'react';
import { RealmResources } from '@/components/tables/RealmResources';
import type { GetRealmQuery } from '@/generated/graphql';

type Prop = {
  realm?: GetRealmQuery;
};

const Harvests: React.FC<Prop> = (props) => {
  const realm = props.realm?.realm;
  if (!realm) {
    return null;
  }

  return (
    <>
      <RealmResources showClaimable realm={realm} loading={false} />
    </>
  );
};

export default Harvests;
