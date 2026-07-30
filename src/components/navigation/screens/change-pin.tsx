import { ActionButton } from '@/components/common/action-button';
import { FormField } from '@/components/common/form-field';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Text } from '@/components/ui/text';
import { changePinSchema } from '@/lib/constants/resolvers';
import { toast } from '@/lib/helpers/toast';
import { useNavigate } from '@/lib/hooks/use-navigate';
import {
  useChangePINMutation,
  useGetVaultCardQuery,
} from '@/lib/store/vault_card';
import { useAuth } from '@/providers/auth-session';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useCallback } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import z from 'zod/v3';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
});

export function ChangePINScreen() {
  const { goBack } = useNavigate();
  const { currentUser } = useAuth();
  const { data: vaultCard } = useGetVaultCardQuery(currentUser?.id ?? '', {
    skip: !currentUser,
  });
  const [mutate, { isLoading }] = useChangePINMutation();

  const form = useForm({
    defaultValues: {
      pin: '',
      confirm_pin: '',
    },
    resolver: zodResolver(changePinSchema),
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof changePinSchema>) => {
      mutate([vaultCard?.id ?? '', values.pin])
        .then(() => {
          toast.success('PIN updated successfully');
          startTransition(() => {
            goBack();
          });
        })
        .catch(() => toast.error('Failed to update PIN'));
    },
    [vaultCard, mutate, goBack],
  );
  return (
    <>
      <HeaderDetails position="left" title="Change PIN" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FormProvider {...form}>
          <Layout>
            <View style={styles.container}>
              <Controller
                name="pin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Enter New PIN"
                    keyboardType="number-pad"
                    value={field.value}
                    maxLength={6}
                    error={fieldState.error?.message}
                    onChangeText={field.onChange}
                    placeholder="Enter new PIN"
                  />
                )}
              />
              <Controller
                name="confirm_pin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Confirm New PIN"
                    value={field.value}
                    maxLength={6}
                    error={fieldState.error?.message}
                    keyboardType="number-pad"
                    placeholder="Confirm new PIN"
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Text color="gray-500" typo="text-lg" weight={500}>
                PIN must be 6 digits . Do not use repeated numbers
              </Text>
            </View>
          </Layout>
          <ActionButton
            disabled={!form.formState.isValid || isLoading}
            onPress={form.handleSubmit(onSubmit)}
          >
            Save new PIN
          </ActionButton>
        </FormProvider>
      </KeyboardAvoidingView>
    </>
  );
}
