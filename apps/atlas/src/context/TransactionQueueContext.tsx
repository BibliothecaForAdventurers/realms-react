import { useStarknetTransactionManager } from '@starknet-react/core';
import { getStarknet } from 'get-starknet';
import { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import type { AddTransactionResponse } from 'starknet';
import { getTxMessage } from '@/hooks/settling/useTxMessage';
import { Scroll } from '@/shared/Icons';
import { ENQUEUED_STATUS } from '../constants';
import type { RealmsCall } from '../types';

type Call = RealmsCall;
type Tx = Call & { status: typeof ENQUEUED_STATUS };
interface TransactionQueue {
  add: (tx: Call | Call[]) => void;
  transactions: Tx[];
  remove: (tx: Tx) => void;
  empty: () => void;
  executeMulticall: (transactions: Tx[]) => Promise<AddTransactionResponse>;
}

export const TransactionQueueContext = createContext<
  TransactionQueue | undefined
>(undefined);

export const TransactionQueueProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [txs, setTx] = useState<Tx[]>([]);

  const add = (tx: Call[] | Call) => {
    const scrollIcon = <Scroll className="w-4" />;

    if (Array.isArray(tx)) {
      toast(`${tx.length} Command(s) Queued`, {
        icon: scrollIcon,
        position: 'top-right',
      });
      setTx((prev) =>
        prev.concat(tx.map((t) => ({ ...t, status: ENQUEUED_STATUS })))
      );
    } else {
      toast('Command Queued: ' + tx.metadata?.action, {
        icon: scrollIcon,
        position: 'top-right',
      });
      setTx((prev) => prev.concat({ ...tx, status: ENQUEUED_STATUS }));
    }
  };

  const remove = (tx: Tx) => {
    const i = txs.indexOf(tx);
    setTx((prev) => {
      const next = [...prev];
      next.splice(i, 1);
      return next;
    });
  };

  const empty = () => {
    setTx([]);
  };

  const txManager = useStarknetTransactionManager();

  const executeMulticall = async (inline?: Tx[]) => {
    const starknet = getStarknet();
    await starknet.enable();

    const t = inline ? [...inline, ...txs] : txs;

    const resp = await starknet.account.execute(t);

    txManager.addTransaction({
      ...resp,
      status: 'TRANSACTION_RECEIVED',
      transactionHash: resp.transaction_hash,
      metadata: {
        title: 'Multicall',
        description: t.map((t) =>
          getTxMessage({ ...t, status: 'TRANSACTION_RECEIVED' })
        ),
      },
    });
    setTx([]);
    return resp;
  };

  return (
    <TransactionQueueContext.Provider
      value={{ add, remove, empty, transactions: txs, executeMulticall }}
    >
      {children}
    </TransactionQueueContext.Provider>
  );
};

export const useTransactionQueue = () => {
  const txContext = useContext(TransactionQueueContext);
  if (txContext == undefined) {
    throw new Error(
      'useTransactionQueue must be used within a TransactionQueueProvider'
    );
  }
  return txContext;
};
