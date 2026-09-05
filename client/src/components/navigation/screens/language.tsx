import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { languages } from '@/lib/constants/langs';
import { useUpdateLanguageMutation } from '@/lib/store/users';
import { UserLanguage } from '@/lib/types/user';
import { useAuth } from '@/providers/auth-session';
import { useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
});

export function LanguageScreen() {
  const { currentUser } = useAuth();

  const [mutate] = useUpdateLanguageMutation();
  const onSelect = useCallback(
    (v: string) => {
      mutate(v as UserLanguage);
    },
    [mutate],
  );
  return (
    <>
      <HeaderDetails position="left" title="Language" />
      <Layout>
        <View style={styles.container}>
          <RadioGroup
            value={currentUser?.language ?? 'en'}
            onValueChange={onSelect}
          >
            {languages.map(lang => (
              <RadioGroupItem
                textProps={{ typo: 'label-lg' }}
                id={lang.id}
                key={lang.id}
              >
                {lang.title}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </View>
      </Layout>
    </>
  );
}
