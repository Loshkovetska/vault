import { TransactionFilter, TransactionType } from '../types/transaction';

export type ActivityTabItem = { title: string; type: TransactionFilter };

export const activityTypes: Array<ActivityTabItem> = [
  {
    title: 'All',
    type: 'all',
  },
  {
    title: 'Payments',
    type: TransactionType.Bill,
  },
  {
    title: 'TopUp',
    type: TransactionType.TopUp,
  },
  {
    title: 'Transfers',
    type: TransactionType.Transfer,
  },
  {
    title: 'Withdraws',
    type: TransactionType.Withdraw,
  },
  {
    title: 'Refund',
    type: TransactionType.Refund,
  },
];
