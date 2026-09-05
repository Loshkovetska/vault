import { Transaction } from './transaction';

export type BankAccount = {
  id: string;
  account: string;
  name: string;
  balance: number;
  user_id: string;
};

export type AddBankRequest = Omit<BankAccount, 'id' | 'user_id'>;

export type RegisteredCard = {
  id: string;
  user_id: string;
  card_holder: string;
  card_number: string;
  expired_at: string;
  cvv: string;
  balance: number;
};

export type AddCardRequest = Omit<RegisteredCard, 'id' | 'user_id'>;

export type VaultCardStatus = 'active' | 'block' | 'pause';

export type VaultCard = {
  id: string;
  user_id: string;
  balance: number;
  card_number: string;
  card_holder: string;
  expired_at: string;
  daily_limit: number;
  status: VaultCardStatus;
  pin: string;
};

export type VaultCardAnalytic = {
  metrics: {
    metric: string;
    amount: number;
    data: Transaction[];
    total: number;
  }[];
};
