export enum TransactionStatus {
  'SUCCESS' = 'SUCCESS',
  'FAILED' = 'FAILED',
  'PROCESSING' = 'PROCESSING',
  'PENDING' = 'PENDING',
}

export enum TransactionType {
  TopUp = 'top_up',
  Transfer = 'transfer',
  Withdraw = 'withdraw',
  Refund = 'refund',
  Bill = 'bill',
}

export type PaymentMethod = 'bank_transfer' | 'card' | 'store_card';

export type Tracking = {
  text: string;
  completed: boolean;
  createdAt: string;
};

export type TransactionFilter = 'all' | TransactionType;

export type BillService =
  | 'pulse_data'
  | 'electricity'
  | 'water'
  | 'internet'
  | 'e-commerce'
  | 'asurance';

//TRANSACTIONS

export type Withdraw = {
  method_id: string;
  reference_code: string;
  fee: number;
  destination_account: string;
};

export type TopUp = {
  method_id: string;
  payment_method: PaymentMethod;
  reference_code: string;
};

export type Bill = {
  service: BillService;
  account_reference?: string;
  method_id: string;
  payment_method: PaymentMethod;
};

export type Refund = {
  original_transaction: string;
  reason: string;
  tracking?: Tracking[];
  completed_at?: string;
};

export type Transfer = {
  destination_account: string;
  method_id: string;
  payment_method: PaymentMethod;
};

export type TransactionMeta = Withdraw | Bill | TopUp | Refund | Transfer;

export type Transaction = {
  id: string;
  status: keyof typeof TransactionStatus;
  type: TransactionType;
  name: string;
  user_id: string;
  amount: number;
  created_at: string;
  metadata: TransactionMeta;
};

export type DeterminedTransaction<T> = Exclude<Transaction, 'metadata'> & {
  metadata: T;
};

export type GetTransactionsRequest = {
  search: string;
  type: TransactionFilter;
  user_id: string;
};

export type MerchantInfo = {
  rawFields: Record<string, string>;
  merchantName: string;
  amount: number | null;
  currencyCode: string | null;
  city: string | null;
  categoryCode: string | null;
  categoryName: string | null;
};
