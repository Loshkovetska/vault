import { EmptyList } from '@/components/common/empty-list';
import { HeaderDetails } from '@/components/common/header-details';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { emptyLists } from '@/lib/constants/empty-lists';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useGetNotificationsQuery } from '@/lib/store/notifications';
import { Notification, NotificationType } from '@/lib/types/notification';
import { dateFormate } from '@/lib/utils/date';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { Icon } from '@solar-icons/react-native/lib/types';
import {
  Chart,
  Letter,
  Sale,
  Shield,
  TransferHorizontal,
  ArrowRightUp,
} from '@solar-icons/react-native/Linear';
import { useCallback } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  icon: { color: theme.colors['gray-900'] },
  item: {
    padding: 12,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
  },
  col: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
}));

const icons: Record<NotificationType, Icon> = {
  transaction: TransferHorizontal,
  monthly_report: Chart,
  newsletter: Letter,
  promotion: Sale,
  security: Shield,
};

export function NotificationsScreen() {
  const { goToPromo, goToActivityDetails } = useNavigate();
  const { data: notifications } = useGetNotificationsQuery(undefined);

  const onPress = useCallback(
    (type: NotificationType, id?: string) => {
      switch (type) {
        case 'promotion':
          return goToPromo(id ?? '');
        case 'transaction':
          return goToActivityDetails(id ?? '');
        default:
          return;
      }
    },
    [goToPromo, goToActivityDetails],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Notification>) => {
      const ItemIcon = icons[item.type];
      const navigateTo =
        item?.metadata?.promotion_id ||
        item?.metadata?.report_id ||
        item?.metadata?.transaction_id;
      return (
        <TouchableOpacity
          activeOpacity={navigateTo ? undefined : 1}
          onPress={
            navigateTo ? () => onPress(item.type, navigateTo) : undefined
          }
        >
          <LiquidGlassView effect="clear" key={item.id} style={styles.item}>
            <View style={styles.row}>
              <View style={styles.col}>
                <ItemIcon size={20} color={styles.icon.color} />
                <Text typo="text-xl" weight={600}>
                  {item.title}
                </Text>
                {navigateTo && (
                  <ArrowRightUp color={styles.icon.color} size={20} />
                )}
              </View>
            </View>
            <Separator />
            <Text typo="text-md" weight={500}>
              {item.text}
            </Text>
            <Text typo="text-md" weight={500}>
              {dateFormate(new Date(item.created_at))}
            </Text>
          </LiquidGlassView>
        </TouchableOpacity>
      );
    },
    [onPress],
  );

  return (
    <>
      <HeaderDetails title="Notifications" position="left" />
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<EmptyList {...emptyLists['notification']} />}
        renderItem={renderItem}
      />
    </>
  );
}
