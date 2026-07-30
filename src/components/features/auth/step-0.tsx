import { Apple } from '@/assets/icons/apple';
import { Google } from '@/assets/icons/google';
import { FormField } from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { signInSchema } from '@/lib/constants/resolvers';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import z from 'zod/v3';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    gap: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  top: {
    gap: 12,
  },
  btns: { gap: 16 },
  oauth: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 48,
    height: 48,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Step0Props = {
  type: 'sign-in' | 'sign-up';
  onSubmit: (values: z.infer<typeof signInSchema>) => void;
  onAuth: (oauth: 'google' | 'apple') => void;
};

export function Step0({ type, onAuth, onSubmit }: Step0Props) {
  const { goToScreen, goToLegal } = useNavigate();

  const form = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  });
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('@/assets/images/welcome-screen.png')}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.top}>
            <Text typo="display-md" weight={600}>
              Welcome to VAULTA
            </Text>
            <Text typo="text-xl" weight={500} color="gray-700">
              A secure, fast digital wallet that is always under your control.
            </Text>
          </View>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormField
                label="Email"
                keyboardType="email-address"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormField
                label="Password"
                value={field.value}
                secureTextEntry
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <View style={styles.btns}>
            <Button
              size="md"
              color="gray-0"
              variant="white"
              innerStyle={{ ...styles.btn, width: '100%' }}
              onPress={form.handleSubmit(onSubmit)}
            >
              Sign {type === 'sign-in' ? 'In' : 'Up'}
            </Button>
            <Separator />
            <View style={styles.oauth}>
              {Platform.OS === 'ios' && (
                <Button
                  size="md"
                  color="gray-0"
                  variant="white"
                  innerStyle={styles.btn}
                  iconLeft={<Apple />}
                  onPress={() => onAuth('apple')}
                />
              )}

              <Button
                size="md"
                color="gray-0"
                variant="white"
                iconLeft={<Google />}
                innerStyle={styles.btn}
                onPress={() => onAuth('google')}
              />
            </View>
          </View>
          {type === 'sign-in' && (
            <Text typo="text-md" textAlign="center">
              Don't have an account?{' '}
              <Text color="brand-600" onPress={() => goToScreen('SignUp')}>
                Sign Up
              </Text>
            </Text>
          )}
          {type === 'sign-up' && (
            <Text typo="text-md" textAlign="center">
              Already have an account?{' '}
              <Text color="brand-600" onPress={() => goToScreen('SignIn')}>
                Sign In
              </Text>
            </Text>
          )}
          <Text typo="text-md" textAlign="center">
            By signing {type === 'sign-in' ? 'in' : 'up'}, you agree to our{' '}
            <Text color="brand-600" onPress={() => goToLegal('terms')}>
              Terms and Conditions
            </Text>
            . Learn how we use your data in our{' '}
            <Text color="brand-600" onPress={() => goToLegal('privacy')}>
              Privacy Policy
            </Text>
            .
          </Text>
          <Text typo="text-md" textAlign="center">
            Trouble {type === 'sign-in' ? 'logging in' : 'signing up'}?{' '}
            <Text color="brand-600" onPress={() => goToScreen('ContactUs')}>
              Contact Support
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
