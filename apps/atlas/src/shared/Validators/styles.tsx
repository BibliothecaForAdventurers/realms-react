export const TxStyles = {
  status: {
    REJECTED: 'bg-red-400',
    NOT_RECEIVED: 'bg-red-200',
    RECEIVED: 'bg-green-400/90 animate-ping',
    PENDING: 'bg-orange-400 animate-ping',
    ACCEPTED_ON_L2: 'bg-green-600/90',
    ACCEPTED_ON_L1: 'bg-green-900',
    TRANSACTION_RECEIVED: 'bg-green-400 animate-ping',
  },
} as const;
