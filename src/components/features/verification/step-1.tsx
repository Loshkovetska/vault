import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  block: {
    padding: 16,
    gap: 16,
  },
});

export function Step1() {
  return (
    <View>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Please prepare the following:
        </Text>
        <Text typo="text-lg" weight={500}>
          ✓ National ID (KTP/Passport)
        </Text>
        <Text typo="text-lg" weight={500}>
          ✓ Clear selfie photo
        </Text>
      </View>
      <Separator />
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Tips for better verification:
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Good lighting
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; No blur or reflection
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Original document only
        </Text>
      </View>
    </View>
  );
}
