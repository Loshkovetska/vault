import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { Tracking } from '@/lib/types/transaction';
import { CheckCircle } from '@solar-icons/react-native/Linear';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  block: { gap: 16 },
  gap12: { gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
}));

export function ActivityTracking({ tracking }: { tracking?: Tracking[] }) {
  if (!tracking || !tracking?.length) return null;
  return (
    <View style={styles.block}>
      <Text typo="text-xl" weight={600}>
        Progress Timeline
      </Text>
      <View style={styles.gap12}>
        {tracking?.map(track => (
          <View style={styles.row} key={track.text}>
            <CheckCircle
              size={36}
              color={
                themeConfig.colors[track.completed ? 'brand-600' : 'warn-600']
              }
            />
            <Text typo="text-lg">{track.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
