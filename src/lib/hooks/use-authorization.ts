import { useCallback, useState } from 'react';
import { useSignInMutation, useSignUpMutation } from '../store/users';
import { authService } from '../firebase/auth';
import z from 'zod/v3';
import { signUpSchema } from '../constants/resolvers';
import { toast } from '../helpers/toast';
import { logger } from '../helpers/logger';

type UseAuthroization = {
  onSuccessSignIn?: (v: string) => void;
  onSuccessSignUp?: (v: string) => void;
  onNext?: (params?: { full_name: string; photo_url?: string | null }) => void;
};
export function useAuthorization({
  onSuccessSignIn,
  onSuccessSignUp,
  onNext,
}: UseAuthroization) {
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [createdId, setId] = useState<string | null>(null);
  const [emailVerified, setVerified] = useState(false);

  const onSignInViaEmail = useCallback(
    async (email: string, password: string) => {
      try {
        const user = await authService.signInViaEmail(email, password);

        const res = await signIn(user.uid);
        if (res.data) {
          onSuccessSignIn?.(res.data);
        } else {
          toast.error('Incorrect credentials');
        }
      } catch (e) {
        logger('[ERROR]: onSignInViaEmail', e);
        toast.error('Something went wrong');
      }
    },
    [signIn, onSuccessSignIn],
  );

  const onSignInViaProvider = useCallback(
    async (oauth: 'google' | 'apple') => {
      try {
        const user = await authService[
          oauth === 'google' ? 'signInViaGoogle' : 'signInViaApple'
        ]();
        if (user) {
          const res = await signIn(user.uid);
          if (res.data) {
            onSuccessSignIn?.(res.data);
          } else {
            setId(user.uid);
            setVerified(true);
            onNext?.({
              full_name: user.displayName ?? '',
              photo_url: user?.photoURL,
            });
          }
        } else toast.error(`Failed to sign in via ${oauth}`);
      } catch (e) {
        logger('[ERROR]: onSignInViaProvider', e);
        toast.error('Something went wrong!');
      }
    },
    [onSuccessSignIn, signIn, onNext],
  );

  const initSignUp = useCallback(
    async (email: string, password: string) => {
      try {
        const user = await authService.signUp(email, password);
        if (user) {
          setId(user.uid);
          onNext?.();
        } else {
          toast.error(`Failed to sign up`);
        }
      } catch (e) {
        logger('[ERROR]: initSignUp', e);
        toast.error('Something went wrong!');
      }
    },
    [onNext],
  );

  const completeSignUp = useCallback(
    async (
      values: z.infer<typeof signUpSchema> & {
        document: string | null;
        selfie: string | null;
      },
    ) => {
      try {
        const res = await signUp({
          id: createdId ?? '',
          full_name: values.full_name,
          bdate: values.bdate,
          gender: values.gender,
          image_url: values.selfie ?? '',
          nationality: values.nationality,
          email_verified: emailVerified,
          phone_verified: false,
          phone: '',
          biometric: true,
          is_verified: false,
          document: values.document ?? '',
          pin: values.pin,
          personalized_ads: true,
          two_factor_auth: false,
          data_sharing: true,
          language: 'en',
          transaction: true,
          promotion: true,
          security: true,
          monthly_report: true,
          newsletter: true,
        });
        if (res.data) {
          onSuccessSignUp?.(res.data);
        } else throw new Error('Failed to create user');
      } catch (e) {
        logger('[ERROR]: completeSignUp', e);
        toast.error('Something went wrong!');
      }
    },
    [createdId, emailVerified, signUp, onSuccessSignUp],
  );
  return { onSignInViaEmail, onSignInViaProvider, initSignUp, completeSignUp };
}
