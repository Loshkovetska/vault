import { ActionButton } from '@/components/common/action-button';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Step2 } from '@/components/features/top-up/step-2';
import { Step0 } from '@/components/features/withdraw/step-0';
import { Step1 } from '@/components/features/withdraw/step-1';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useGetBankAccountsQuery } from '@/lib/store/bank_accounts';
import { usePostTransactionMutation } from '@/lib/store/transactions';
import { useGetVaultCardQuery } from '@/lib/store/vault_card';
import { BankAccount } from '@/lib/types/card';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
  Withdraw,
} from '@/lib/types/transaction';
import { accountFormate, generateReference } from '@/lib/utils/string';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const initialState = {
  amount: '',
};

export function WithDraw() {
  const { goToActivity } = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<typeof initialState>(initialState);

  const [postTransaction] = usePostTransactionMutation();
  const { data: banks } = useGetBankAccountsQuery(undefined);

  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const [selectedBank, setSelectedBank] = useState<BankAccount | null>();

  const onStep = useCallback((num: number) => setStep(prev => prev + num), []);

  const onChange = useCallback(
    (k: keyof typeof initialState) => (v: string) => {
      setData(prev => ({ ...prev, [k]: v }));
    },
    [],
  );
  const onBankSelect = useCallback(
    (bank: BankAccount) => {
      setSelectedBank(bank);
      onStep(1);
    },
    [onStep],
  );

  const onSubmit = useCallback(() => {
    postTransaction({
      status: TransactionStatus.PENDING,
      created_at: new Date().toISOString(),
      type: TransactionType.Withdraw,
      name: `Withdraw to ${selectedBank?.name}`,
      amount: Number(data.amount),
      metadata: {
        method_id: vaultCard?.id,
        destination_account: selectedBank?.account,
        reference_code: generateReference(TransactionType.Withdraw),
        fee: 0,
      } as Withdraw,
    } as Omit<Transaction, 'id'>).then(() => onStep(1));
  }, [selectedBank, vaultCard, data, postTransaction, onStep]);

  const titles = {
    0: 'Withdraw',
    1: `To ${selectedBank?.name ?? ''}`,
    2: 'Withdraw Details',
  };
  const content = {
    0: <Step0 banks={banks ?? []} onSelect={onBankSelect} />,
    1: (
      <Step1
        balance={vaultCard?.balance}
        amount={data.amount}
        onAmountChange={onChange('amount')}
      />
    ),
    2: (
      <Step2
        payment_method="bank_transfer"
        category="Withdraw"
        amount={Number(data.amount)}
        method={{
          id: selectedBank?.id ?? '',
          name: selectedBank?.name ?? '',
          account: accountFormate(selectedBank?.account ?? ''),
          balance: selectedBank?.balance ?? 0,
        }}
      />
    ),
  };
  const btns = {
    1: {
      title: 'Next',
      action: onSubmit,
    },
    2: {
      title: 'Done',
      action: () => goToActivity(),
    },
  };
  const isValid = {
    1:
      Number(data.amount) > 0 &&
      Number(data.amount) <= (vaultCard?.balance ?? 0) &&
      !!selectedBank,
    2: true,
  };

  const currentBtn = btns[step as 1];
  return (
    <>
      <HeaderDetails
        position="left"
        onBack={!step ? undefined : () => onStep(-1)}
        title={titles[step as 0]}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout>{content[step as 0]}</Layout>
        {currentBtn && (
          <ActionButton
            testID="submit"
            disabled={!isValid[step as 1]}
            onPress={currentBtn.action}
          >
            {currentBtn.title}
          </ActionButton>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
