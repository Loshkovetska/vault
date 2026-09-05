import { ActionButton } from '@/components/common/action-button';
import { FormField } from '@/components/common/form-field';
import { Layout } from '@/components/common/layout';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { priceMask } from '@/lib/constants/masks';
import { qrCodeSchema } from '@/lib/constants/resolvers';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { usePostTransactionMutation } from '@/lib/store/transactions';
import { useGetVaultCardQuery } from '@/lib/store/vault_card';
import {
  MerchantInfo,
  Transaction,
  TransactionStatus,
  TransactionType,
  Transfer,
} from '@/lib/types/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import z from 'zod/v3';

const styles = StyleSheet.create({
  top: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 32,
  },
  form: { paddingVertical: 8, paddingHorizontal: 16, gap: 32 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  textarea: { height: 96 },
});

type Step1Props = {
  merchant: MerchantInfo | null;
};

export function Step1({ merchant }: Step1Props) {
  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const [postTransaction] = usePostTransactionMutation();
  const form = useForm({
    defaultValues: {
      amount: String(merchant?.amount ?? 0),
      note: '',
    },
    resolver: zodResolver(qrCodeSchema),
  });

  const { goToActivity } = useNavigate(() => {
    form.reset();
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof qrCodeSchema>) => {
      const inputData: Omit<Transaction, 'id' | 'user_id'> = {
        name: `QR-Code Payment for ${merchant?.merchantName}(${merchant?.categoryName})`,
        type: TransactionType.Transfer,
        metadata: {
          method_id: vaultCard?.id ?? '',
          payment_method: 'store_card',
          destination_account: '00000000000000000000',
        } as Transfer,
        status: TransactionStatus.PENDING,
        amount: Number(values.amount),
        created_at: new Date().toISOString(),
      };
      postTransaction(inputData).then(() => {
        goToActivity();
      });
    },
    [vaultCard, merchant, postTransaction, goToActivity],
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FormProvider {...form}>
        <Layout>
          <View style={styles.top}>
            <Text typo="text-lg" weight={500}>
              Merchant: {merchant?.merchantName}
            </Text>
            <Text typo="text-lg" weight={500}>
              Category: {merchant?.categoryName}
            </Text>
          </View>
          <View style={styles.form}>
            <Controller
              control={form.control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <View style={styles.row}>
                  <Text typo="text-lg" weight={500}>
                    Input nominal:
                  </Text>
                  <Input
                    variant="auto"
                    value={value}
                    readOnly
                    mask={priceMask}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            <Controller
              control={form.control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Notes (Optional)"
                  value={value}
                  placeholder="Enter a description..."
                  multiline
                  style={styles.textarea}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        </Layout>
        <ActionButton
          disabled={!form.formState.isValid}
          onPress={form.handleSubmit(onSubmit)}
        >
          Payment Now
        </ActionButton>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
