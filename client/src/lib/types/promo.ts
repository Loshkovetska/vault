export enum PromoType {
  'discount' = 'discount',
  'saving' = 'saving',
  'cashback' = 'cashback',
}

type PaymentMethod = 'card' | 'store_card';

export type Promo = {
  id: string;
  user_id: string;
  type: PromoType;
  amount: number;
  max_amount: number;
  min_transaction: number;
  payment_method: PaymentMethod;
  created_at: string;
  expired_at: string;
  short_info: string;
  description: string;
  image_url: string;
  used: boolean;
};
