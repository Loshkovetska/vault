import { BaseRow } from '@/components/common/base-row';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ActivityStatus } from '../activity-status';
import { dateFormate } from '@/lib/utils/date';
import {
  Tracking,
  TransactionStatus,
  TransactionType,
} from '@/lib/types/transaction';
import { ActivityTracking } from '../activity-tracking';
import { Button } from '@/components/ui/button';
import { Flag } from '@solar-icons/react-native/Linear';
import { themeConfig } from '@/lib/theme';
import { ActivityType } from '../activity-type';

const styles = StyleSheet.create(() => ({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 24,
  },
  top: {
    alignItems: 'center',
    gap: 16,
  },
  list: {
    gap: 12,
  },
  block: { gap: 16 },
  row_start: {
    justifyContent: 'flex-start',
  },
  gap12: { gap: 12 },
  gap8: { gap: 12 },
}));

type DetailsWrapperProps = {
  data: Record<string, string>;
  type: string;
  defined_type: TransactionType;
  status: keyof typeof TransactionStatus;
  created_at: string;
  completed_at?: string;
  tracking?: Tracking[];
};

export function DetailsWrapper({
  data,
  type,
  status,
  created_at,
  completed_at,
  tracking,
  defined_type,
}: DetailsWrapperProps) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ActivityType size="lg" type={defined_type} />
        <Text typo="display-xs" textAlign="center" weight={600}>
          VAULTA — e-Receipt
        </Text>
        <Text typo="display-xs" textAlign="center" weight={600}>
          {type} Transaction Record
        </Text>
      </View>
      <Separator />
      <View style={styles.gap12}>
        <BaseRow
          style={styles.row_start}
          label="Status"
          value={<ActivityStatus status={status} />}
        />
        <BaseRow
          style={styles.row_start}
          label="Time"
          value={dateFormate(new Date(created_at ?? 0))}
        />
        {completed_at && (
          <BaseRow
            label="Date Complete"
            value={dateFormate(new Date(completed_at ?? 0))}
          />
        )}
      </View>
      <Separator />
      <View style={styles.block}>
        {Object.entries(data).map(([k, v]) => (
          <BaseRow key={k} label={k} value={v} />
        ))}
      </View>
      {tracking && <Separator />}
      <ActivityTracking tracking={tracking} />
      <Separator />
      <Button
        variant="text"
        size="lg"
        color="error-300"
        onPress={() => {}}
        iconLeft={<Flag size={24} color={themeConfig.colors['error-300']} />}
      >
        Report Problem
      </Button>
      <Separator />
      <View style={styles.gap8}>
        <Text typo="text-xl" weight={600}>
          Support Contact
        </Text>
        <Text typo="text-lg" weight={500}>
          help@vaulta.app | 1500-VLT{' '}
        </Text>
      </View>
    </View>
  );
}
