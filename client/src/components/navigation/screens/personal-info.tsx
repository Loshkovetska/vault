import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Avatar } from '@/components/ui/avatar';
import { GlassButton } from '@/components/ui/glass-button';
import { useUpdateUserMutation } from '@/lib/store/users';
import { themeConfig } from '@/lib/theme';
import { GalleryEdit } from '@solar-icons/react-native/Linear';
import { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  Controller,
  FormProvider,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoType, personalSchema } from '@/lib/constants/resolvers';
import { PersonalInfoForm } from '@/components/common/personal-info-form';
import { useAuth } from '@/providers/auth-session';
import { ActionButton } from '@/components/common/action-button';

const styles = StyleSheet.create(() => ({
  container: { gap: 24, paddingTop: 32, paddingHorizontal: 16 },
  avatar: {
    alignSelf: 'center',
    position: 'relative',
  },
  avatar_update: {
    width: 28,
    height: 28,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
}));

export function PersonalInfoScreen() {
  const { currentUser } = useAuth();

  const [mutate, { isLoading }] = useUpdateUserMutation();

  const form = useForm({
    defaultValues: {
      full_name: currentUser?.full_name ?? '',
      email: currentUser?.email ?? '',
      bdate: currentUser?.bdate ?? '',
      gender: currentUser?.gender ?? 'Man',
      nationality: currentUser?.nationality ?? '',
      image_url: currentUser?.image_url ?? '',
    },
    resolver: zodResolver(personalSchema),
  });

  useEffect(() => {
    if (currentUser) {
      form.reset({
        full_name: currentUser?.full_name ?? '',
        email: currentUser?.email ?? '',
        bdate: currentUser?.bdate ?? '',
        gender: currentUser?.gender ?? 'Man',
        nationality: currentUser?.nationality ?? '',
        image_url: currentUser?.image_url ?? '',
      });
    }
  }, [currentUser, form]);

  const onImagePick = useCallback(
    (onChange: (...event: any[]) => void) => () => {
      launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
      }).then(res => {
        onChange(res?.assets?.[0].uri ?? '');
      });
    },
    [],
  );

  const onSubmit = useCallback(
    (values: PersonalInfoType) => {
      mutate({ id: currentUser?.id ?? '', ...values }).then(() => {});
    },
    [mutate, currentUser],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <HeaderDetails title="Personal Info" position="left" />
      <FormProvider {...form}>
        <Layout>
          <View style={styles.container}>
            <Controller
              control={form.control}
              name="image_url"
              render={({ field: { onChange, value } }) => (
                <View style={styles.avatar}>
                  <Avatar size="lg" uri={value ?? ''} />
                  <GlassButton
                    style={styles.avatar_update}
                    size="circle_sm"
                    variant="selected"
                    onPress={onImagePick(onChange)}
                    iconLeft={
                      <GalleryEdit
                        size={16}
                        color={themeConfig.colors['gray-900']}
                      />
                    }
                  />
                </View>
              )}
            />
            <PersonalInfoForm form={form as UseFormReturn<PersonalInfoType>} />
          </View>
        </Layout>
        <ActionButton
          disabled={!form.formState.isValid || isLoading}
          onPress={form.handleSubmit(onSubmit)}
        >
          Save Changes
        </ActionButton>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
