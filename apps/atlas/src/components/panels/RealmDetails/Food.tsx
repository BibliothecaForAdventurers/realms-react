import { Card, CardTitle, CardStats } from '@bibliotheca-dao/ui-lib/base';
import React from 'react';
import type { GetRealmQuery } from '@/generated/graphql';

type Prop = {
  realm?: GetRealmQuery;
};

const Food: React.FC<Prop> = (props) => {
  const realm = props.realm?.realm;
  const getFood = () => {
    return realm?.buildings
      ?.map((a) => a.food)
      .reduce((prev, curr) => prev + curr, 0);
  };

  return (
    <>
      <Card className="col-start-4 col-end-5 ">
        <CardTitle>Food</CardTitle>
        <CardStats className="text-4xl">{getFood()}</CardStats>
      </Card>
    </>
  );
};

export default Food;
