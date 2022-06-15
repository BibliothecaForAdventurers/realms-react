import { useStarknetInvoke, useStarknetCall } from '@starknet-react/core';
import type BN from 'bn.js';
import { useState } from 'react';
import { toBN } from 'starknet/dist/utils/number';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import { useResourcesContract } from '@/hooks/settling/stark-contracts';
import { resources } from '@/util/resources';

type Resources = {
  claim: () => void;
  upgrade: (resourceId: number) => void;
  availableResources: AvailabeResources;
  claimableLords?: BN;
  claimableResources?: any;
  raidableVault?: any;
  loadingClaimable: boolean;
};
type AvailabeResources = {
  daysAccrued: number;
  remainder: number;
};
type useResourcesArgs = {
  token_id: number;
  resources: any;
};

const useResources = (args: useResourcesArgs): Resources => {
  const { contract: resourcesContract } = useResourcesContract();
  const claimResourcesAction = useStarknetInvoke({
    contract: resourcesContract,
    method: 'claim_resources',
  });

  const upgradeResourcesAction = useStarknetInvoke({
    contract: resourcesContract,
    method: 'upgrade_resource',
  });
  const {
    data: allOutputData,
    loading: outputLoading,
    error: outputError,
  } = useStarknetCall({
    contract: resourcesContract,
    method: 'get_all_resource_claimable',
    args: [bnToUint256(toBN(args.token_id))],
  });

  const {
    data: allResourceVault,
    loading: allResourceVaultLoading,
    error: allResourceVaultError,
  } = useStarknetCall({
    contract: resourcesContract,
    method: 'get_all_vault_raidable',
    args: [bnToUint256(toBN(args.token_id))],
  });

  const {
    data: availableResourcesData,
    loading,
    error,
  } = useStarknetCall({
    contract: resourcesContract,
    method: 'days_accrued',
    args: [bnToUint256(toBN(args.token_id))],
  });

  let availableResources: AvailabeResources;
  if (availableResourcesData) {
    availableResources = {
      daysAccrued: availableResourcesData[0].toNumber(),
      remainder: availableResourcesData[1].toNumber(),
    };
  } else {
    availableResources = {
      daysAccrued: 0,
      remainder: 0,
    };
  }

  return {
    availableResources,
    raidableVault:
      allResourceVault && allResourceVault['user_mint']
        ? allResourceVault['user_mint'].map((resource) => uint256ToBN(resource))
        : 0,
    claimableLords: allOutputData && uint256ToBN(allOutputData[1]),
    claimableResources:
      allOutputData && allOutputData['user_mint']
        ? allOutputData['user_mint'].map((resource) => uint256ToBN(resource))
        : 0,
    claim: () => {
      console.log(claimResourcesAction.error);
      claimResourcesAction.invoke({
        args: [bnToUint256(toBN(args.token_id))],
        metadata: {
          action: 'harvest_resources',
          realmId: args.token_id,
        },
      });
    },
    upgrade: (resourceId: number) => {
      upgradeResourcesAction.invoke({
        args: [bnToUint256(toBN(args.token_id)), resourceId],
        metadata: {
          action: 'upgrade_resource',
          realmId: args.token_id,
          resourceId,
        },
      });
    },
    loadingClaimable: outputLoading,
  };
};

export default useResources;
