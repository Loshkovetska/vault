import { ActionButton } from '@/components/common/action-button';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { services, Step0 } from '@/components/features/bill/step-0';
import { Step1 } from '@/components/features/bill/step-1';
import { Step3 } from '@/components/features/bill/step-3';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { usePostTransactionMutation } from '@/lib/store/transactions';
import { useGetVaultCardQuery } from '@/lib/store/vault_card';
import {
  Bill as BillT,
  BillService,
  PaymentMethod,
  Transaction,
  TransactionType,
  TransactionStatus,
} from '@/lib/types/transaction';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const initialState: {
  service: BillService | null;
  amount: string;
  account_reference: string;
  payment_method: PaymentMethod | null;
  method_id: string;
} = {
  service: null,
  amount: '',
  account_reference: '',
  method_id: '',
  payment_method: 'store_card',
};

export function Bill() {
  const { goToActivity } = useNavigate();

  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);

  const [postTransaction] = usePostTransactionMutation();
  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const onStep = useCallback((num: number) => setStep(prev => prev + num), []);
  const onChange = useCallback(
    (k: keyof typeof initialState) => (v: string) => {
      setData(prev => ({ ...prev, [k]: v }));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    postTransaction({
      status: TransactionStatus.PENDING,
      created_at: new Date().toISOString(),
      type: TransactionType.Bill,
      name: `Bill for ${data.service}`,
      metadata: {
        service: data.service,
        account_reference: data.account_reference,
        payment_method: data.payment_method,
        method_id: vaultCard?.id,
      } as BillT,
      amount: Number(data.amount),
    } as Omit<Transaction, 'id'>).then(() => goToActivity());
  }, [data, vaultCard, postTransaction, goToActivity]);

  const stepContent = {
    0: {
      title: 'Bill',
      content: (
        <Step0 service={data.service} onServiceChange={onChange('service')} />
      ),
      btnTitle: 'Select this Bill',
      isValid: !!data.service,
      onPress: () => onStep(1),
    },
    1: {
      title: data.service ? services[data.service]?.title : '',
      content: (
        <Step1
          amount={data.amount}
          isPhone={data.service === 'pulse_data'}
          account_reference={data.account_reference}
          onAccountChange={onChange('account_reference')}
          onAmountChange={onChange('amount')}
        />
      ),
      btnTitle: 'Continue to Confirm',
      isValid:
        Number(data.amount) > 0 &&
        vaultCard?.id &&
        data.account_reference?.length > 0,
      onPress: () => onStep(1),
    },
    2: {
      title: 'Confirm Payment',
      content: (
        <Step3
          service={data.service ?? 'pulse_data'}
          payment_method="Vault Card"
          total={Number(data.amount)}
          account_reference={data.account_reference}
        />
      ),
      btnTitle: 'Pay Securely',
      isValid: true,
      onPress: onSubmit,
    },
  };
  const currentStep = stepContent[step as 0];
  return (
    <>
      <HeaderDetails
        onBack={!step ? undefined : () => onStep(-1)}
        position="left"
        title={currentStep?.title}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout>{currentStep?.content}</Layout>
        {currentStep?.btnTitle && (
          <ActionButton
            disabled={!currentStep.isValid}
            onPress={currentStep.onPress}
          >
            {currentStep.btnTitle}
          </ActionButton>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
