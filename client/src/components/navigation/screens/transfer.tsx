import { ActionButton } from '@/components/common/action-button';
import { AmountSelect } from '@/components/common/amount-select';
import { FormField } from '@/components/common/form-field';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { accountMask } from '@/lib/constants/masks';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { usePostTransactionMutation } from '@/lib/store/transactions';
import { useGetVaultCardQuery } from '@/lib/store/vault_card';
import {
  PaymentMethod,
  Transaction,
  TransactionStatus,
  TransactionType,
  Transfer as TTransfer,
} from '@/lib/types/transaction';
import { accountFormate } from '@/lib/utils/string';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const initialState: {
  destination_account: string;
  amount: string;
  payment_method: PaymentMethod;
} = {
  destination_account: '',
  amount: '',
  payment_method: 'store_card',
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  list: { gap: 12 },
});

export function Transfer() {
  const { goToActivity } = useNavigate();

  const [data, setData] = useState(initialState);
  const [postTransaction] = usePostTransactionMutation();
  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const onChange = useCallback(
    (k: keyof typeof initialState) => (v: string) => {
      setData(prev => ({ ...prev, [k]: v }));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    postTransaction({
      status: TransactionStatus.PENDING,
      type: TransactionType.Transfer,
      created_at: new Date().toISOString(),
      name: `Transfer to ${accountFormate(data.destination_account)}`,
      amount: Number(data.amount),
      metadata: {
        destination_account: data.destination_account,
        payment_method: data.payment_method,
        method_id: vaultCard?.id,
      } as TTransfer,
    } as Omit<Transaction, 'id'>).then(() => goToActivity());
  }, [data, vaultCard, postTransaction, goToActivity]);

  const isValid =
    data.destination_account.length > 0 && Number(data.amount) > 0;
  return (
    <>
      <HeaderDetails title="Transfer" position="left" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout>
          <View style={styles.container}>
            <FormField
              testID="destination_account"
              label="No.Account"
              value={data.destination_account}
              mask={accountMask}
              keyboardType="number-pad"
              onChangeText={onChange('destination_account')}
            />
            <AmountSelect
              amount={data.amount}
              onAmountChange={onChange('amount')}
            />
          </View>
        </Layout>
        <ActionButton disabled={!isValid} testID="submit" onPress={onSubmit}>
          Confirm Payment
        </ActionButton>
      </KeyboardAvoidingView>
    </>
  );
}
