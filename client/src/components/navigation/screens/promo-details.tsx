import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Step0 } from '@/components/features/promo/details/step-0';
import { Step1 } from '@/components/features/promo/details/step-1';
import { Step2 } from '@/components/features/promo/details/step-2';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useGetBankAccountsQuery } from '@/lib/store/bank_accounts';
import { useGetPromoQuery } from '@/lib/store/promos';
import { useGetVaultCardQuery } from '@/lib/store/vault_card';
import { priceFormate } from '@/lib/utils/number';
import { accountFormate } from '@/lib/utils/string';
import { RouteProp } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { RootParams } from '../type';
import { Placeholder } from '@/components/common/placeholder';
import { ActionButton } from '@/components/common/action-button';

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
});

const initialState = {
  amount: '',
  bank_id: '',
};

export function PromoDetailsScreen({
  route: { params },
}: {
  route: RouteProp<RootParams, 'PromoDetails'>;
}) {
  const [step, setStep] = useState(0);

  const [data, setData] = useState({
    amount: '',
    bank_id: '',
  });

  const { goToActivity } = useNavigate(() => {
    setData(initialState);
    setStep(0);
  });

  const { data: vaultCard, isLoading: isCardLoading } =
    useGetVaultCardQuery(undefined);

  const { data: promo, isLoading: isPromoLoading } = useGetPromoQuery(
    params?.id,
  );
  const { data: bankAccounts, isLoading: isBankLoading } =
    useGetBankAccountsQuery(undefined, {
      skip: !promo || !!promo?.used,
    });

  const onStep = useCallback((v: number) => {
    setStep(prev => Math.max(0, prev + v));
  }, []);

  const onUpdate = useCallback(
    (k: keyof typeof data) => (v: string) => {
      setData(prev => ({ ...prev, [k]: v }));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    goToActivity();
  }, [goToActivity]);

  const paymentMethods = [
    {
      id: 'balance',
      label: `vaulta Balance (${priceFormate(vaultCard?.balance ?? 0)})`,
      disabled: !vaultCard?.balance,
    },
    ...(bankAccounts ?? [])?.map(c => ({
      id: c.id,
      label: `${c.name} (${accountFormate(c.account)})`,
      disabled: false,
    })),
  ];

  const titles = {
    0: 'Promo Detail',
    1: 'Select Payment',
    2: 'Review Payment',
  };
  const btns = {
    0: 'Use this Promo',
    1: 'Continue',
    2: 'Pay & Confirm',
  };

  const isValid = {
    0: !promo?.used,
    1: data.bank_id.length > 0,
    2: true,
  };

  const payment_method = paymentMethods.find(d => d.id === data.bank_id);

  const content = {
    0: <Step0 promo={promo ?? undefined} />,
    1: (
      <Step1
        payment_methods={paymentMethods}
        amount={promo?.max_amount ?? 0}
        bank_id={data.bank_id}
        onBankChange={onUpdate('bank_id')}
      />
    ),
    2: (
      <Step2
        amount={promo?.max_amount ?? 0}
        payment_method={payment_method?.label ?? ''}
        percentage={promo?.amount ?? 0}
      />
    ),
  };

  const isLoading = isPromoLoading || isCardLoading || isBankLoading;
  if (isLoading) return <Placeholder type="promo-details" />;
  return (
    <>
      <HeaderDetails
        position="left"
        title={titles[step as 0]}
        onBack={!step ? undefined : () => onStep(-1)}
      />
      <Layout>
        <View style={styles.container}>{content[step as 0]}</View>
      </Layout>

      <ActionButton
        disabled={!isValid[step as 0]}
        onPress={step === 2 ? onSubmit : () => onStep(1)}
      >
        {btns[step as 0]}
      </ActionButton>
    </>
  );
}
