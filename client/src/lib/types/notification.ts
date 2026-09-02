export type NotificationType =
  | 'transaction'
  | 'promotion'
  | 'security'
  | 'monthly_report'
  | 'newsletter';

export type Notification = {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  text: string;
  created_at: string;
  metadata?: {
    transaction_id?: string;
    report_id?: string;
    promotion_id?: string;
    session_id?: string;
  };
};
