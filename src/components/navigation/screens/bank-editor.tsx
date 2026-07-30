import { useCallback, useEffect } from 'react';
import { RootParams } from '../type';
import { RouteProp } from '@react-navigation/native';
import {
  useConnectBankMutation,
  useGetBankQuery,
  useUpdateBankMutation,
} from '@/lib/store/bank_accounts';
import { useAuth } from '@/providers/auth-session';
import { toast } from '@/lib/helpers/toast';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { HeaderDetails } from '@/components/common/header-details';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Layout } from '@/components/common/layout';
import { StyleSheet } from 'react-native-unistyles';
import { FormField } from '@/components/common/form-field';
import { accountMask, priceMask } from '@/lib/constants/masks';
import { ActionButton } from '@/components/common/action-button';
import { bankAccountSchema } from '@/lib/constants/resolvers';
import z from 'zod/v3';
import { AddBankRequest } from '@/lib/types/card';
import { logger } from '@/lib/helpers/logger';

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    justifyContent: 'space-between',
  },
  col: {
    flex: 1 / 2,
  },
});

export function BankEditor({
  route: { params },
}: {
  route: RouteProp<RootParams, 'AddBank'>;
}) {
  const { currentUser } = useAuth();
  const bankId = params?.id;
  const { data: bankAccount } = useGetBankQuery(bankId ?? '', {
    skip: !bankId,
  });
  const [connectBank, { isLoading: isConnecting }] = useConnectBankMutation();
  const [updateBank, { isLoading: isUpdating }] = useUpdateBankMutation();

  const form = useForm({
    defaultValues: {
      account: '',
      name: '',
      balance: '2400',
    },
    mode: 'onChange',
    resolver: zodResolver(bankAccountSchema),
  });

  const { goBack } = useNavigate(() => {
    form.reset();
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof bankAccountSchema>) => {
      if (!currentUser) return;
      try {
        const payload: AddBankRequest = {
          name: values.name,
          account: values.account,
          balance: Number(values.balance),
          user_id: currentUser?.id,
        };
        if (bankId) {
          await updateBank({ id: bankId, ...payload });
          toast.success('Bank information updated!');
          goBack();
          return;
        }
        await connectBank(payload);
        toast.success('Bank was connected!');
        goBack();
      } catch (e) {
        logger('[Error] BankEditor onSubmit', e);
        toast.error(`Failed to ${bankId ? 'update' : 'connect'} account!`);
      }
    },
    [currentUser, bankId, updateBank, connectBank, goBack],
  );

  useEffect(() => {
    if (bankAccount) {
      form.reset({
        name: bankAccount.name,
        account: bankAccount.account,
        balance: String(bankAccount.balance),
      });
    }
  }, [bankAccount, form]);

  const isLoading = isConnecting || isUpdating;
  const title = bankId ? 'Update' : 'Connect';
  return (
    <>
      <HeaderDetails title={`${title} Bank Account`} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FormProvider {...form}>
          <Layout>
            <View style={styles.container}>
              <Controller
                name="account"
                control={form.control}
                render={({ field }) => (
                  <FormField
                    label="No Account"
                    mask={accountMask}
                    placeholder="Enter Account"
                    keyboardType="number-pad"
                    value={field.value}
                    maxLength={19}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Bank Name"
                    placeholder="Enter Bank Name"
                    value={field.value}
                    error={fieldState?.error?.message}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                name="balance"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Balance"
                    style={styles.col}
                    placeholder="Enter Balance"
                    keyboardType="number-pad"
                    mask={priceMask}
                    readOnly
                    value={String(field.value)}
                    error={fieldState?.error?.message}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>
          </Layout>
          <ActionButton
            disabled={!form.formState.isValid || isLoading}
            onPress={form.handleSubmit(onSubmit)}
          >
            {title} Bank Account
          </ActionButton>
        </FormProvider>
      </KeyboardAvoidingView>
    </>
  );
}
