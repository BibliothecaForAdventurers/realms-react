import {
  useStarknet,
  useStarknetInvoke,
  useStarknetCall,
} from '@starknet-react/core';
import { useState, useEffect } from 'react';
import { toBN } from 'starknet/dist/utils/number';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import {
  useSettlingContract,
  useRealms721Contract,
} from '@/hooks/settling/stark-contracts';
type Settling = {
  isRealmsApproved: 'approved' | 'not-approved' | undefined;
  approveRealms: () => void;
  settleRealm: (tokenId: number) => void;
  unsettleRealm: (tokenId: number) => void;
  mintRealm: (tokenId: number) => void;
};

const useSettling = (): Settling => {
  const { contract: settlingContract } = useSettlingContract();
  const { contract: realmsContract } = useRealms721Contract();
  const { account } = useStarknet();
  const [isRealmsApproved, setIsRealmsApproved] = useState<
    'approved' | 'not-approved'
  >();

  const settleRealmAction = useStarknetInvoke({
    contract: settlingContract,
    method: 'settle',
  });

  const unsettleRealmAction = useStarknetInvoke({
    contract: settlingContract,
    method: 'unsettle',
  });

  const mintRealmAction = useStarknetInvoke({
    contract: realmsContract,
    method: 'mint',
  });
  const approve721 = useStarknetInvoke({
    contract: realmsContract,
    method: 'setApprovalForAll',
  });

  const {
    data: realmsApprovalData,
    loading,
    error,
  } = useStarknetCall({
    contract: realmsContract,
    method: 'isApprovedForAll',
    args: [
      toBN(account as string).toString(),
      toBN(settlingContract?.address as string).toString(),
    ],
    options: { watch: false },
  });

  useEffect(() => {
    if (realmsApprovalData !== undefined && account !== undefined) {
      setIsRealmsApproved(
        realmsApprovalData.toString() === '1' ? 'approved' : 'not-approved'
      );
    }
  }, [realmsApprovalData, account]);

  return {
    settleRealm: (tokenId: number) => {
      settleRealmAction.invoke({
        args: [bnToUint256(toBN(tokenId))],
        metadata: {
          action: 'settle',
          realmId: tokenId,
        },
      });
    },
    unsettleRealm: (tokenId: number) => {
      unsettleRealmAction.invoke({
        args: [bnToUint256(toBN(tokenId))],
        metadata: {
          action: 'unsettle',
          realmId: tokenId,
        },
      });
    },
    mintRealm: (tokenId: number) => {
      mintRealmAction.invoke({
        args: [toBN(account as string).toString(), bnToUint256(toBN(tokenId))],
        metadata: {
          action: 'mint',
          realmId: tokenId,
        },
      });
    },
    isRealmsApproved,
    approveRealms: () => {
      approve721.invoke({
        args: [toBN(settlingContract?.address as string).toString(), '1'],
      });
    },
  };
};

export default useSettling;
