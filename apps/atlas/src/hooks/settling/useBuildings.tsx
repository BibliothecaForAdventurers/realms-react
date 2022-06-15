import { useStarknetInvoke } from '@starknet-react/core';
import { toBN } from 'starknet/dist/utils/number';
import { bnToUint256 } from 'starknet/dist/utils/uint256';
import { useBuildingContract } from '@/hooks/settling/stark-contracts';

type Building = {
  build: (realmId: number, buildingId: number) => void;
};

const useBuildings = (): Building => {
  const { contract: buildingContract } = useBuildingContract();

  const buildAction = useStarknetInvoke({
    contract: buildingContract,
    method: 'build',
  });

  return {
    build: (realmId: number, buildingId: number) => {
      buildAction.invoke({
        args: [bnToUint256(toBN(realmId)), buildingId],
        metadata: {
          action: 'realm_building',
          realmId,
          buildingId,
        },
      });
    },
  };
};

export default useBuildings;
