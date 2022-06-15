import { useStarknetInvoke } from '@starknet-react/core';
import { BigNumber } from 'ethers';
import { toFelt } from 'starknet/dist/utils/number';
import { bnToUint256 } from 'starknet/dist/utils/uint256';
import { useExchangeContract } from './settling/stark-contracts';
import useTxCallback from './useTxCallback';

export type ResourceQty = {
  resourceId: number;
  qty: number;
};

const useSwapResourcesTransaction = (method: string) => {
  const { contract: exchangeContract } = useExchangeContract();
  const {
    data: transactionHash,
    invoke,
    error: invokeError,
  } = useStarknetInvoke({
    contract: exchangeContract,
    method,
  });
  const { tx, loading } = useTxCallback(transactionHash, (status) => {
    // Update state changes?
    return true;
  });

  return {
    transactionHash: tx,
    invoke,
    invokeError,
    loading,
  };
};

export const useBuyResources = () => {
  const { transactionHash, invoke, invokeError, loading } =
    useSwapResourcesTransaction('buy_tokens');
  const buyTokens = (
    maxAmount: BigNumber,
    tokenIds: number[],
    tokenAmounts: BigNumber[],
    deadline: number
  ) => {
    if (loading) {
      return;
    }
    invoke({
      args: [
        bnToUint256(maxAmount.toHexString()),
        tokenIds.map((value) => bnToUint256(value)),
        tokenAmounts.map((value) =>
          bnToUint256(BigNumber.from(value).toHexString())
        ),
        toFelt(deadline),
      ],
    });
  };

  return {
    loading,
    buyTokens,
    transactionHash,
    invokeError,
  };
};

export const useSellResources = () => {
  const { transactionHash, invoke, invokeError, loading } =
    useSwapResourcesTransaction('sell_tokens');

  const sellTokens = (
    minAmount: BigNumber,
    tokenIds: number[],
    tokenAmounts: BigNumber[],
    deadline: number
  ) => {
    if (loading) {
      return;
    }
    invoke({
      args: [
        bnToUint256(minAmount.toHexString()),
        tokenIds.map((value) => bnToUint256(value)),
        tokenAmounts.map((value) =>
          bnToUint256(BigNumber.from(value).toHexString())
        ),
        toFelt(deadline),
      ],
    });
  };

  return {
    loading,
    sellTokens,
    transactionHash,
    invokeError,
  };
};
