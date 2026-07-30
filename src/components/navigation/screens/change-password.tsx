import { ActionButton } from '@/components/common/action-button';
import { FormField } from '@/components/common/form-field';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { changePasswordSchema } from '@/lib/constants/resolvers';
import { toast } from '@/lib/helpers/toast';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useUpdatePasswordMutation } from '@/lib/store/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
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

export function ChangePassword() {
  const { goBack } = useNavigate();
  const [update, { isLoading }] = useUpdatePasswordMutation();
  const form = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof changePasswordSchema>) => {
      update(values.password)
        .then(() => {
          toast.success('Password Updated');
          goBack();
        })
        .catch(() => toast.error('Failed to update password'));
    },
    [update, goBack],
  );
  return (
    <>
      <HeaderDetails title="Change Password" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FormProvider {...form}>
          <Layout>
            <View style={styles.container}>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Password"
                    secureTextEntry
                    value={field.value}
                    error={fieldState.error?.message}
                    onChangeText={field.onChange}
                    placeholder="Enter new Password"
                  />
                )}
              />
              <Controller
                name="confirm_password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Confirm Password"
                    secureTextEntry
                    value={field.value}
                    error={fieldState.error?.message}
                    placeholder="Confirm new Password"
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
            Update Password
          </ActionButton>
        </FormProvider>
      </KeyboardAvoidingView>
    </>
  );
}
