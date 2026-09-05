export type UserLanguage = 'en' | 'ua';

export type UserNotifications = {
  transaction: boolean;
  promotion: boolean;
  security: boolean;
  monthly_report: boolean;
  newsletter: boolean;
};

export type User = {
  full_name: string;
  image_url: string;
  bdate: string;
  gender: 'Man' | 'Woman';
  nationality: string;
  email: string;
  id: string;
  language: UserLanguage;
  email_verified: boolean;
  phone?: string;
  phone_verified: boolean;
  two_factor_auth: boolean;
  biometric: boolean;
  data_sharing: boolean;
  personalized_ads: boolean;
  is_verified: boolean;
} & UserNotifications;

export type UpdateUserInfo = Pick<
  User,
  'id' | 'full_name' | 'bdate' | 'email' | 'image_url'
>;

export type ToggledPreference =
  | 'two_factor_auth'
  | 'biometric'
  | 'data_sharing'
  | 'personalized_ads'
  | 'transaction'
  | 'promotion'
  | 'security'
  | 'monthly_report'
  | 'newsletter';

export type ToggleUserPreference = {
  body: Partial<Record<ToggledPreference, boolean>>;
};

export type UserSignUp = Pick<
  User,
  | 'full_name'
  | 'id'
  | 'bdate'
  | 'nationality'
  | 'image_url'
  | 'gender'
  | 'email_verified'
> & {
  document: string;
  pin: string;
};

export type UserVerification = {
  document_type: 'national_id' | 'driver_id' | 'passport' | null;
  document: string | null;
  selfie: string | null;
};
