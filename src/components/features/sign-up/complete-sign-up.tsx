import { Success } from '@/assets/icons/success';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
  },
});

export function CompleteSignUp() {
  return (
    <View style={styles.container}>
      <Success />
      <Text typo="display-sm" weight={600} textAlign="center">
        Verification Complete
      </Text>
      <Text textAlign="center" typo="text-xl" weight={500}>
        You can now set up your account profile.
      </Text>
    </View>
  );
}
