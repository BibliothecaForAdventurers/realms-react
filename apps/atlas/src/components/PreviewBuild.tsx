import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { toBN } from 'starknet/dist/utils/number';
import { useResourcesContext } from '@/context/ResourcesContext';
import useResourcesDeficit from '@/hooks/settling/useResourcesDeficit';
import { ResourceIcon } from '@/shared/ResourceIcon';

interface BuildingProps {
  realmId: number;
  buildingId: number;
  buildingName: string;
  limit?: number | null;
  limitTraitId: number;
  limitTraitName: string;
  count: number;
  population: number;
  food: number;
  culture: number;
  buildingCost: {
    __typename?: 'BuildingCost';
    amount: number;
    resources: any;
  };
}

const CheckBuildRequirements = (props: { building?: BuildingProps }) => {
  const { building } = props;

  const [costs, setCosts] = useState<Record<number, string>>({});

  const { deficits } = useResourcesDeficit({ resourceCosts: costs });

  useEffect(() => {
    if (building) {
      const costKeyed = {};
      building.buildingCost.resources.forEach((r) => {
        costKeyed[r.resourceId] = toBN(r.amount)
          .mul(toBN('1000000000000000000', 10))
          .toString();
      });
      setCosts(costKeyed);
    }
  }, [building]);

  if (building == undefined) {
    return null;
  }

  return (
    <div>
      <h2 className="font-lords">{building.buildingName}</h2>
      <hr />
      {/* <p>Constrained by {building.limitTraitName} ({building.limit})</p> */}
      <div className="flex justify-between items-center">
        <span className="text-2xl my-4">Resource Cost</span>
        {deficits && Object.keys(deficits).length > 0 ? (
          <span className="border-orange-200 border rounded-md text-orange-200 px-2 relative">
            <ExclamationCircleIcon className="inline-block w-5 absolute -left-7 top-0.5" />{' '}
            {Object.keys(deficits).length} Resource Deficits
          </span>
        ) : null}
      </div>

      <div className="flex flex-row justify-between">
        {building.buildingCost.resources.map((r) => (
          <div
            key={r.resourceId}
            className="flex flex-col items-center relative"
          >
            {deficits[r.resourceId] ? (
              <ExclamationCircleIcon className="absolute -top-2 text-orange-200 -right-2 w-4" />
            ) : null}

            <ResourceIcon size="sm" resource={r.resourceName} />
            <p>{r.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBuildRequirements;
