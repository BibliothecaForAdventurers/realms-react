import type { Transaction } from '@starknet-react/core';
import {
  useStarknet,
  useStarknetTransactionManager,
} from '@starknet-react/core';
import Link from 'next/link';
import { useTxMessage } from '@/hooks/settling/useTxMessage';
interface TxCartItem {
  transaction: Transaction;
}

const STYLES = {
  status: {
    REJECTED: 'bg-red-400',
    NOT_RECEIVED: 'bg-red-200',
    RECEIVED: 'bg-green-400/90 animate-pulse',
    PENDING: 'bg-orange-400 animate-pulse',
    ACCEPTED_ON_L2: 'bg-green-600/90',
    ACCEPTED_ON_L1: 'bg-green-900',
    TRANSACTION_RECEIVED: 'bg-green-400 animate-pulse',
  },
} as const;

const TxCartItem = (props: TxCartItem) => {
  const [title, message] = useTxMessage(props.transaction.metadata);

  return (
    <div
      className={`${
        STYLES.status[props.transaction.status]
      }  rounded shadow-inner flex p-4 w-full font-semibold`}
    >
      <div className="flex justify-between w-full p-2 rounded shadow-inner bg-black/10">
        <div>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
        <Link
          target={'blank_'}
          href={
            'https://goerli.voyager.online/tx/' +
            props.transaction.transactionHash
          }
        >
          See on Voyager
        </Link>
      </div>
      {/* <span>{props.transaction.lastUpdatedAt}</span> */}
    </div>
  );
};

export const TransactionCartTable = () => {
  const { transactions } = useStarknetTransactionManager();
  return (
    <div className="flex flex-wrap w-full space-y-2">
      {transactions.reverse().map((a, index) => {
        return <TxCartItem key={index} transaction={a} />;
      })}
    </div>
  );
};
