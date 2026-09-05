import { ActionButton } from '@/components/common/action-button';
import { FormField } from '@/components/common/form-field';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { accountMask, expireMask, priceMask } from '@/lib/constants/masks';
import { cardSchema } from '@/lib/constants/resolvers';
import { logger } from '@/lib/helpers/logger';
import { toast } from '@/lib/helpers/toast';
import { useNavigate } from '@/lib/hooks/use-navigate';
import {
  useAddCardMutation,
  useGetCardQuery,
  useUpdateCardMutation,
} from '@/lib/store/cards';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import z from 'zod/v3';
import { RootParams } from '../type';
import { RouteProp } from '@react-navigation/native';
import { AddCardRequest } from '@/lib/types/card';

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
export function CardEditor({
  route: { params },
}: {
  route: RouteProp<RootParams, 'AddCard'>;
}) {
  const cardId = params?.id;

  const [addCard, { isLoading: isCreating }] = useAddCardMutation();
  const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation();
  const { data: cardInfo } = useGetCardQuery(cardId ?? '', {
    skip: !cardId,
  });

  const form = useForm({
    defaultValues: {
      card_number: '',
      card_holder: '',
      expired_at: '',
      cvv: '',
      balance: '1500',
    },
    mode: 'onChange',
    resolver: zodResolver(cardSchema),
  });
  const { goBack } = useNavigate(() => {
    form.reset();
  });
  const onSubmit = useCallback(
    async (values: z.infer<typeof cardSchema>) => {
      const [month, year] = [
        Number(values.expired_at.slice(0, 2)) - 1,
        Number(values.expired_at.slice(2, 4)),
      ];

      const payload: AddCardRequest = {
        card_holder: values.card_holder,
        card_number: values.card_number,
        expired_at: new Date(
          new Date(new Date().setMonth(month)).setFullYear(year),
        ).toISOString(),
        cvv: values.cvv,
        balance: Number(values.balance),
      };
      try {
        if (cardId) {
          await updateCard({ id: cardId, ...payload });
          toast.success('Card updated successfully!');
          goBack();
          return;
        }
        await addCard(payload);
        toast.success('Card added successfully!');
        goBack();
      } catch (e) {
        logger(`[ERROR]: CardEditor onSubmit`, e);
        toast.error('Failed to add card!');
      }
    },
    [cardId, addCard, goBack, updateCard],
  );

  useEffect(() => {
    if (cardInfo) {
      const expired_at = new Date(cardInfo.expired_at);
      const [month, year] = [
        String(expired_at.getMonth()).padStart(2, '0'),
        String(expired_at.getFullYear()).slice(2, 4),
      ];
      form.reset({
        card_holder: cardInfo.card_holder,
        card_number: cardInfo.card_number,
        expired_at: `${month}${year}`,
        cvv: cardInfo.cvv,
        balance: String(cardInfo.balance),
      });
    }
  }, [cardInfo, form]);

  const isLoading = isCreating || isUpdating;
  const title = cardId ? 'Update' : 'Add';
  return (
    <>
      <HeaderDetails title={`${title} Payment Card`} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FormProvider {...form}>
          <Layout>
            <View style={styles.container}>
              <Controller
                name="card_number"
                control={form.control}
                render={({ field }) => (
                  <FormField
                    label="Card Number"
                    mask={accountMask}
                    placeholder="Enter Card Number"
                    keyboardType="number-pad"
                    value={field.value}
                    maxLength={19}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                name="card_holder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Card Holder"
                    placeholder="Enter Card Holder"
                    value={field.value}
                    error={fieldState?.error?.message}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <View style={styles.row}>
                <Controller
                  name="expired_at"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormField
                      label="Expire"
                      style={styles.col}
                      keyboardType="number-pad"
                      placeholder="Enter Expire"
                      mask={expireMask}
                      value={field.value}
                      error={fieldState?.error?.message}
                      onChangeText={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="cvv"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormField
                      label="CVV"
                      style={styles.col}
                      placeholder="Enter CVV"
                      keyboardType="number-pad"
                      value={field.value}
                      maxLength={4}
                      error={fieldState?.error?.message}
                      onChangeText={field.onChange}
                    />
                  )}
                />
              </View>
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
            {title} Card
          </ActionButton>
        </FormProvider>
      </KeyboardAvoidingView>
    </>
  );
}
