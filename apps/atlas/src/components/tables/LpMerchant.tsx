import {
  Button,
  Select,
  ResourceIcon,
  InputNumber,
  IconButton,
} from '@bibliotheca-dao/ui-lib';

import ChevronRight from '@bibliotheca-dao/ui-lib/icons/chevron-right.svg';
import Danger from '@bibliotheca-dao/ui-lib/icons/danger.svg';

import LordsIcon from '@bibliotheca-dao/ui-lib/icons/lords-icon.svg';
import { formatEther, parseEther } from '@ethersproject/units';
import { Switch } from '@headlessui/react';
import type { ValueType } from 'rc-input-number/lib/utils/MiniDecimal';

import { useState, useMemo, useReducer } from 'react';
import type { ReactElement } from 'react';
import type { Resource } from '@/context/ResourcesContext';
import { useResourcesContext } from '@/context/ResourcesContext';
import {
  useApproveLordsForExchange,
  useApproveResourcesForExchange,
} from '@/hooks/settling/useApprovals';
import { useAddLiquidity, useRemoveLiquidity } from '@/hooks/useSwapResources';
import type { ResourceQty, LpQty } from '@/hooks/useSwapResources';

type ResourceRowProps = {
  resource: Resource & ResourceQty & LpQty;
  availableResources: Resource[];
  isRemoveLp?: boolean;
  onResourceChange: (resourceId: number, newResourceId: number) => void;
  onQtyChange: (resourceId: number, qty: number) => void;
  onLpQtyChange: (
    resourceId: number,
    lpqty: number,
    currencyqty: number
  ) => void;
};

const displayRate = (rate: string) => {
  return (+formatEther(rate)).toFixed(4);
};

const calculateLords = (rate: string, qty: number) => {
  return +formatEther(rate) * qty;
};

const ResourceRow = (props: ResourceRowProps): ReactElement => {
  const [time, setTime] = useState<NodeJS.Timeout | null>(null);

  const handleValueChange = (newValue: ValueType | null) => {
    if (newValue === null) return;
    if (time) {
      clearTimeout(time);
    }
    let timerId: NodeJS.Timeout | null = null;
    timerId = setTimeout(() => {
      props.onQtyChange(
        props.resource.resourceId,
        parseInt(newValue as string)
      );
    }, 100);
    setTime(timerId);
  };

  const handleSelectChange = (newValue: number) => {
    props.onResourceChange(props.resource.resourceId, newValue);
  };

  return (
    <div className="flex p-3 mb-4 rounded shadow-[inset_0_3px_5px_0px_rgba(0,0,0,0.3)] bg-gray-900/70">
      <div className="sm:w-1/2">
        <Select
          optionIcons={true}
          value={props.resource?.resourceId}
          onChange={handleSelectChange}
        >
          <Select.Button
            label={props.resource?.resourceName ?? ''}
            variant={props.resource?.resourceName ? 'default' : 'placeholder'}
            icon={
              <ChevronRight className="w-5 h-5 text-white transform -rotate-90" />
            }
            labelIcon={
              <ResourceIcon
                size="sm"
                resource={props.resource?.resourceName ?? ''}
              />
            }
          />
          <Select.Options>
            {props.availableResources.map((resource, idx) => (
              <Select.Option
                key={idx}
                value={resource.resourceId}
                label={resource.resourceName}
                selectedIcon={<ChevronRight />}
                icon={
                  <ResourceIcon
                    size="sm"
                    resource={resource?.resourceName ?? ''}
                  />
                }
              />
            ))}
          </Select.Options>
        </Select>
        <div className="flex flex-col justify-between pt-1.5 text-xs uppercase">
          <div className="w-full">
            balance: {formatEther(props.resource.amount)}
          </div>
          <div className="w-full">1 = {displayRate(props.resource.rate)}</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-end pl-4 text-right sm:w-1/2">
        <div className="flex flex-col justify-between">
          <div className="self-center w-full font-semibold tracking-widest uppercase">
            {props.isRemoveLp ? 'remove' : 'add'} Liquidity
          </div>
          <InputNumber
            value={props.resource.qty}
            inputSize="md"
            colorScheme="transparent"
            className="text-2xl font-semibold text-right shadow-[inset_0_3px_5px_0px_rgba(0,0,0,0.3)] mb-2 w-full"
            min={0}
            max={10000}
            stringMode // to support high precision decimals
            onChange={handleValueChange}
          />{' '}
        </div>

        <div className="flex justify-end">
          <span className="mr-1">
            {calculateLords(props.resource.rate, props.resource.qty).toFixed(2)}
          </span>{' '}
          <LordsIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export function LpMerchant(): ReactElement {
  const [tradeType, toggleTradeType] = useReducer((state: 'buy' | 'sell') => {
    return state === 'sell' ? 'buy' : 'sell';
  }, 'buy');

  const isBuy = tradeType === 'buy';
  const isSell = tradeType === 'sell';

  const { addLiquidity, loading: isAddLiquidityTransactionInProgress } =
    useAddLiquidity();

  const { removeLiquidity, loading: isRemoveLiquidityTransactionInProgress } =
    useRemoveLiquidity();

  const isTransactionInProgress =
    isAddLiquidityTransactionInProgress ||
    isRemoveLiquidityTransactionInProgress;

  const {
    availableResourceIds,
    selectedSwapResourcesWithBalance,
    getResourceById,
    addSelectedSwapResources,
    removeSelectedSwapResource,
    updateSelectedSwapResourceQty,
    updateSelectedSwapResource,
    updateSelectedLpResourceQty,
  } = useResourcesContext();

  const { approveLords, isApproved: isLordsApprovedForExchange } =
    useApproveLordsForExchange();

  const { approveResources, isApproved: isResourcesApprovedForExchange } =
    useApproveResourcesForExchange();

  const [slippage, setSlippage] = useState(0.05);

  const calculatedTotalInLords = useMemo(() => {
    return selectedSwapResourcesWithBalance.reduce((acc, resource) => {
      return acc + calculateLords(resource.rate, resource.qty);
    }, 0);
  }, [selectedSwapResourcesWithBalance]);

  const calculatedSlippage = useMemo(() => {
    return calculatedTotalInLords * slippage;
  }, [calculatedTotalInLords, slippage]);

  const deadline = () => {
    const maxDate = new Date();
    maxDate.setMinutes(maxDate.getMinutes() + 30);
    return Math.floor(maxDate.getTime() / 1000);
  };

  // get token ids
  const tokenIds = selectedSwapResourcesWithBalance.map(
    (resource) => resource.resourceId
  );

  function onAddLiquidityClick() {
    // TODO: check lords balance

    if (calculatedTotalInLords === 0 || isTransactionInProgress) return;

    const tokenAmounts = selectedSwapResourcesWithBalance.map((resource) =>
      parseEther(String(resource.qty))
    );

    // tokens * lords_price * (1 + slippage)
    const currencyAmounts = selectedSwapResourcesWithBalance.map((resource) =>
      parseEther(
        String(
          resource.qty * (parseInt(resource.rate) / 10 ** 18) * (1 + slippage)
        )
      )
    );

    addLiquidity(currencyAmounts, tokenIds, tokenAmounts, deadline());
  }

  function onRemoveLiquidityClick() {
    // TODO: check resource balances

    if (calculatedTotalInLords === 0 || isTransactionInProgress) return;

    const tokenAmounts = selectedSwapResourcesWithBalance.map((resource) => {
      const amount = String(
        resource.qty *
          (parseInt(resource.rate) / 10 ** 18) *
          (1 - slippage) *
          1000
      );

      return parseEther(amount);
    });

    // tokens * lords_price * (1 + slippage) / 1000
    const currencyAmounts = selectedSwapResourcesWithBalance.map((resource) => {
      const amount = String(
        resource.qty * (parseInt(resource.rate) / 10 ** 18) * (1 - slippage)
      );
      return parseEther(amount);
    });

    // we pass in the exact LP amount, currency and token amounts are computed via slippage
    const lpAmounts = selectedSwapResourcesWithBalance.map((resource) =>
      parseEther(String(resource.qty))
    );

    removeLiquidity(
      currencyAmounts,
      tokenIds,
      tokenAmounts,
      lpAmounts,
      deadline()
    );
  }

  function onTradeClicked() {
    if (isBuy) {
      onAddLiquidityClick();
    } else {
      onRemoveLiquidityClick();
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      {!isLordsApprovedForExchange && isBuy && (
        <div>
          <Button className="w-full" variant="primary" onClick={approveLords}>
            APPROVE LORDS
          </Button>
        </div>
      )}
      {/* TODO: NOT WORKING */}
      {!isResourcesApprovedForExchange && isSell && (
        <div>
          <Button
            className="w-full"
            variant="primary"
            onClick={approveResources}
          >
            APPROVE RESOURCES
          </Button>
        </div>
      )}
      <div className="flex w-full mx-auto mb-8 tracking-widest">
        <div
          className={`px-4 uppercase ${tradeType === 'buy' && 'font-semibold'}`}
        >
          add LP
        </div>
        <Switch
          checked={isBuy}
          onChange={toggleTradeType}
          className={`${
            isBuy ? 'bg-green-600' : 'bg-blue-600'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              isSell ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>
        <div className={`px-4 uppercase ${isSell && 'font-semibold'}`}>
          remove LP
        </div>
      </div>
      <div>
        {selectedSwapResourcesWithBalance.map((resource) => (
          <div className="relative" key={resource.resourceId}>
            <ResourceRow
              key={resource.resourceId}
              resource={resource}
              isRemoveLp={isSell}
              availableResources={availableResourceIds.map(
                (resourceId) => getResourceById(resourceId) as Resource
              )}
              onResourceChange={updateSelectedSwapResource}
              onQtyChange={updateSelectedSwapResourceQty}
              onLpQtyChange={updateSelectedLpResourceQty}
            />
            <IconButton
              className="absolute -top-3 -right-3"
              icon={<Danger className="w-3 h-3" />}
              aria-label="Remove Row"
              size="xs"
              onClick={() => removeSelectedSwapResource(resource.resourceId)}
            />
          </div>
        ))}
        <div className="flex w-full">
          <Button
            aria-label="Add Row"
            size="xs"
            variant="primary"
            className="mx-auto"
            onClick={() => addSelectedSwapResources()}
          >
            add +
          </Button>
        </div>
      </div>
      <div className="flex justify-end w-full pt-4">
        <div className="flex flex-col justify-end w-full">
          <div className="flex flex-col  rounded p-4 mb-5 bg-gray-500/70 shadow-[inset_0_6px_8px_0px_rgba(0,0,0,0.18)]">
            <div className="flex justify-end text-2xl font-semibold">
              <span className="mr-1">{calculatedTotalInLords.toFixed(2)}</span>
              <LordsIcon className="w-6 h-6 mt-0.5" />
            </div>
            <div className="flex justify-end text-md">
              {calculatedSlippage.toFixed(2)}
            </div>
          </div>

          <Button
            className="w-full"
            variant="primary"
            onClick={onTradeClicked}
            disabled={
              isTransactionInProgress ||
              (!isLordsApprovedForExchange && isBuy) ||
              (!isResourcesApprovedForExchange && isSell)
            }
          >
            {isTransactionInProgress
              ? 'Pending...'
              : isBuy
              ? 'add liquidity'
              : 'remove liquidity'}
          </Button>
        </div>
      </div>
    </div>
  );
}
