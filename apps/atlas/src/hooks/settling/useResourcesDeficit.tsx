import { useEffect, useState } from 'react';
import type { BigNumberish } from 'starknet/dist/utils/number';
import { toBN } from 'starknet/dist/utils/number';
import { useResourcesContext } from '@/context/ResourcesContext';

type Props = {
  /*
  Resource costs keyed by resource ID. Values must have correct amount of decimals.
  This is passed in so that the costs are agnostic for multiple entities (buildings, etc...)
  */
  resourceCosts: Record<number, BigNumberish>;
};
/*
  Function that compares Resource balance in wallet with a cost
  and returns amount deficits.
*/
const useResourcesDeficit = (props: Props) => {
  const { resourceCosts } = props;

  const [deficits, setDeficits] = useState<Record<number, BigNumberish>>({});

  const { balance: resourceBalances, balanceStatus } = useResourcesContext();

  useEffect(() => {
    if (Object.keys(resourceCosts).length > 0 && balanceStatus == 'success') {
      const deficits = {};
      resourceBalances.forEach((r) => {
        const amount = toBN(r.amount, 10);
        if (resourceCosts[r.resourceId]) {
          const costBN = toBN(resourceCosts[r.resourceId]);
          if (amount.sub(costBN).lte(toBN(0))) {
            deficits[r.resourceId] = costBN.sub(amount);
          }
        }
      });

      setDeficits(deficits);
    }
  }, [resourceBalances, resourceCosts]);

  return {
    deficits,
  };
};

export default useResourcesDeficit;
