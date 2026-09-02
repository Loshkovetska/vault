import { FormField } from '@/components/common/form-field';
import { SignUpForm, signUpSchema } from '@/lib/constants/resolvers';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  FormProvider,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Step0 } from './step-0';
import { PersonalInfoForm } from '@/components/common/personal-info-form';
import { Step3 } from '../verification/step-3';
import { Step5 } from '../verification/step-5';
import { CompleteSignUp } from '../sign-up/complete-sign-up';
import { HeaderDetails } from '@/components/common/header-details';
import { useCallback, useRef, useState } from 'react';
import { useAuthorization } from '@/lib/hooks/use-authorization';
import { useAuth } from '@/providers/auth-session';
import { Layout } from '@/components/common/layout';
import { ActionButton } from '@/components/common/action-button';

const completeStyles = StyleSheet.create(() => ({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
}));

type AuthProps = {
  type: 'sign-in' | 'sign-up';
};

export function Auth({ type }: AuthProps) {
  const [step, setStep] = useState(0);
  const [document, setDocument] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const triggerCount = useRef(0);
  const { goToScreen } = useNavigate();
  const { setSession } = useAuth();

  const form = useForm({
    defaultValues: {
      full_name: '',
      bdate: '',
      gender: 'Man',
      nationality: '',
      pin: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const onStep = useCallback((num: number) => setStep(prev => prev + num), []);

  const { onSignInViaProvider, onSignInViaEmail, initSignUp, completeSignUp } =
    useAuthorization({
      onSuccessSignIn: v => setSession(v, () => goToScreen('HomeTabs')),
      onSuccessSignUp: v => setSession(v, () => setStep(4)),
      onNext: params => {
        if (params?.full_name) {
          form.setValue('full_name', params.full_name, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }
        if (params?.photo_url) {
          setSelfie(params?.photo_url);
        }
        onStep(1);
      },
    });

  const onNext = useCallback(async () => {
    if (triggerCount.current) return;
    const values = form.getValues();
    triggerCount.current = 1;
    await completeSignUp({
      ...values,
      gender: values.gender as 'Man',
      selfie,
      document,
    });
  }, [form, selfie, document, completeSignUp]);

  const onSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      const authFunc = type === 'sign-in' ? onSignInViaEmail : initSignUp;
      await authFunc(values.email, values.password);
    },
    [type, onSignInViaEmail, initSignUp],
  );

  const authContent = {
    0: <Step0 type={type} onAuth={onSignInViaProvider} onSubmit={onSubmit} />,
    1: (
      <FormProvider {...form}>
        <View style={completeStyles.container}>
          <PersonalInfoForm
            withEmail={false}
            form={form as UseFormReturn<SignUpForm>}
          />
          <Controller
            name="pin"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormField
                label="Create PIN"
                placeholder="Enter PIN"
                keyboardType="number-pad"
                value={field.value}
                error={fieldState?.error?.message}
                onChangeText={field.onChange}
              />
            )}
          />
        </View>
      </FormProvider>
    ),
    2: <Step3 document={document ?? ''} onDocumentChange={setDocument} />,
    3: (
      <Step5 selfie={selfie ?? ''} onSelfieChange={setSelfie} onNext={onNext} />
    ),
    4: <CompleteSignUp />,
  };

  const titles = {
    1: 'Fullfill your profile',
    2: 'Identity Verification',
    3: 'Identity Verification',
    4: 'Identity Verification',
  };
  const btnTitles = {
    1: 'Next: Identity Verification',
    2: 'Save',
    4: "Let's Start",
  };
  const isValid = {
    1: form.formState.isValid,
    2: !!document,
    4: true,
  };
  const onClick = {
    1: () => onStep(1),
    2: () => onStep(1),
    4: () => goToScreen('HomeTabs'),
  };

  return !step ? (
    authContent[0]
  ) : (
    <>
      <HeaderDetails onBack={() => onStep(-1)} title={titles[step as 1]} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout>{authContent[step as 1]}</Layout>
        {btnTitles[step as 1] && (
          <ActionButton
            onPress={onClick[step as 1]}
            disabled={!isValid[step as 1]}
          >
            {btnTitles[step as 1]}
          </ActionButton>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
