import { ActionButton } from '@/components/common/action-button';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { methods, Step0 } from '@/components/features/top-up/step-0';
import { Step1 } from '@/components/features/top-up/step-1';
import { Step2 } from '@/components/features/top-up/step-2';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useGetBankAccountsQuery } from '@/lib/store/bank_accounts';
import { useGetCardsQuery } from '@/lib/store/cards';
import { usePostTransactionMutation } from '@/lib/store/transactions';
import {
  useGetVaultCardQuery,
  useUpdateBalanceMutation,
} from '@/lib/store/vault_card';
import {
  TopUp,
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/lib/types/transaction';
import {
  accountFormate,
  encryptCardNumber,
  generateReference,
} from '@/lib/utils/string';
import { useAuth } from '@/providers/auth-session';
import { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const initialState = {
  payment_method: '',
  method_id: '',
  amount: '',
};

export function TopUpScreen() {
  const { currentUser } = useAuth();
  const [postTransaction] = usePostTransactionMutation();
  const [updateBalance] = useUpdateBalanceMutation();

  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const { data: bankAccounts } = useGetBankAccountsQuery(undefined);

  const { data: cards } = useGetCardsQuery(undefined);
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);

  const { goToActivity } = useNavigate(() => {
    setData(initialState);
    setStep(0);
  });

  const onUpdate = useCallback(
    (k: keyof typeof data) => (v: string) => {
      setData(prev => ({ ...prev, [k]: v }));
    },
    [],
  );

  const onStep = useCallback((v: number) => {
    setStep(prev => Math.max(0, prev + v));
  }, []);

  const onSubmit = useCallback(() => {
    updateBalance([vaultCard?.id ?? '', Number(data.amount)]).then(() => {
      postTransaction({
        status: TransactionStatus.PENDING,
        created_at: new Date().toISOString(),
        type: TransactionType.TopUp,
        name: `TopUp Via ${
          methods[data.payment_method as 'bank_transfer']?.title
        }`,
        amount: Number(data.amount),
        metadata: {
          method_id: data.method_id,
          payment_method: data.payment_method as 'bank_transfer',
          reference_code: generateReference(TransactionType.TopUp),
        } as TopUp,
      } as Omit<Transaction, 'id'>).then(() => goToActivity());
    });
  }, [data, vaultCard, postTransaction, updateBalance, goToActivity]);

  const buttonTitle = {
    0: 'Select this Payment',
    1: 'Next',
    2: 'Payment Now',
  };

  const headerTitle = {
    0: 'TopUp',
    1: `TopUp via ${methods[data.payment_method as 'bank_transfer']?.title}`,
    2: 'Confirmation TopUp',
    3: 'TopUp Details',
  };

  const payments = useMemo(() => {
    switch (data.payment_method) {
      case 'bank_transfer':
        return (bankAccounts ?? []).map(bank => ({
          id: bank.id,
          name: bank.name,
          account: accountFormate(bank.account),
          balance: bank.balance,
        }));
      case 'card':
        return (cards ?? []).map(bank => ({
          id: bank.id,
          name: 'Debit Card',
          account: encryptCardNumber(bank.card_number),
          balance: bank.balance,
        }));
      default:
        return null;
    }
  }, [data.payment_method, bankAccounts, cards]);

  const currentPayment = useMemo(() => {
    return (payments ?? [])?.find(payment => payment.id === data.method_id);
  }, [payments, data.method_id]);

  const isValid = {
    0: data.payment_method.length > 0,
    1:
      data.method_id.length > 0 &&
      Number(data.amount) > 0 &&
      Number(data.amount) <= (currentPayment?.balance ?? 0),
    2: true,
    4: true,
  };

  const steps = {
    0: (
      <Step0
        selected={data.payment_method}
        onValueChange={onUpdate('payment_method')}
      />
    ),
    1: (
      <Step1
        balance={currentPayment?.balance}
        amount={data.amount}
        payment_method={data.payment_method as 'bank_transfer'}
        method={currentPayment}
        options={payments ?? []}
        onAmountChange={onUpdate('amount')}
        onBankChange={onUpdate('method_id')}
      />
    ),
    2: (
      <Step2
        amount={Number(data.amount)}
        payment_method={data.payment_method as 'bank_transfer'}
        method={currentPayment}
        user_name={currentUser?.full_name ?? ''}
        category="TopUp"
      />
    ),
  };
  return (
    <>
      <HeaderDetails
        onBack={!step ? undefined : () => onStep(-1)}
        position="left"
        title={headerTitle[step as 0]}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout>{steps[step as 0]}</Layout>
        <ActionButton
          testID="submit"
          disabled={!isValid[step as 0]}
          onPress={step === 2 ? onSubmit : () => onStep(1)}
        >
          {buttonTitle[step as 0]}
        </ActionButton>
      </KeyboardAvoidingView>
    </>
  );
}
