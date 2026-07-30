import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  DonutChart,
  BarChart,
  PieChartCenterLabelRenderProps,
} from 'react-native-chart-kit/v2';
import { themeConfig } from '@/lib/theme';
import { Text } from '@/components/ui/text';
import { screenWidth } from '@/lib/utils/device';
import { useCallback, useMemo, useState } from 'react';
import { percentageFormate, priceFormate } from '@/lib/utils/number';
import { Transaction, TransactionType } from '@/lib/types/transaction';
import { ActivityItemShort } from '../activity/activity-item-short';
import { Layout } from '@/components/common/layout';
import { useAuth } from '@/providers/auth-session';
import { useGetVaultAnalyticsQuery } from '@/lib/store/vault_card';
import { EmptyList } from '@/components/common/empty-list';
import { emptyLists } from '@/lib/constants/empty-lists';
import { ActivityType } from '../activity/activity-type';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { VaultCardAnalytic } from '@/lib/types/card';
import { Separator } from '@/components/ui/separator';
import { activityChartFormate } from '@/lib/utils/transactions';
import { Rect } from 'react-native-svg';

const themeColors = themeConfig.colors;

const colors = [
  themeColors['brand-600'],
  themeColors['success-500'],
  themeColors['gray-500'],
  themeColors['error-500'],
];

const icons = {
  Bill: 'bill',
  Transfer: 'transfer',
  Withdraw: 'withdraw',
  Refund: 'refund',
};

const styles = StyleSheet.create(() => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
  },
  center_label: {
    alignItems: 'center',
    gap: 2,
  },
  section: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  category: {
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category_top: {
    flexGrow: 1,
  },
  separator: {
    paddingVertical: 8,
  },
}));

export function CardActivity() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { currentUser } = useAuth();

  const { data, isLoading } = useGetVaultAnalyticsQuery(currentUser?.id ?? '', {
    skip: !currentUser,
  });
  const totalAmount = useMemo(
    () => data?.metrics?.reduce((prev, cur) => prev + cur.amount, 0) ?? 0,
    [data?.metrics],
  );

  const renderCenterLabel = useCallback(
    ({
      selectedArc,
    }: PieChartCenterLabelRenderProps<{ metric: string; amount: number }>) => {
      return (
        <View style={styles.center_label}>
          {selectedArc && (
            <ActivityType
              size="sm"
              type={
                icons[
                  (selectedArc?.label ?? 'Bill') as 'Bill'
                ] as TransactionType.Bill
              }
            />
          )}
          <Text
            typo={selectedArc ? 'label-md' : 'display-xs'}
            weight={600}
            color="gray-900"
          >
            {selectedArc?.label ?? 'Total'}
          </Text>
          <Text typo="display-xs" weight={600}>
            -{priceFormate(selectedArc?.value ?? totalAmount, 0)}
          </Text>
        </View>
      );
    },
    [totalAmount],
  );

  const renderItemCategory = useCallback(
    ({ item, index }: ListRenderItemInfo<VaultCardAnalytic['metrics'][0]>) => {
      return (
        <TouchableOpacity
          activeOpacity={item.total ? 0.8 : 1}
          style={[
            styles.category,
            {
              opacity: !item.total ? 0.3 : 1,
              pointerEvents: !item.total ? 'none' : 'auto',
            },
          ]}
          onPress={item.total ? () => setSelectedIndex(index) : undefined}
        >
          <ActivityType
            type={icons[item.metric as 'Bill'] as TransactionType.Bill}
          />
          <View style={styles.category_top}>
            <Text typo="label-md">{item.metric}</Text>
            <Text color="gray-600">{item.total} transactions</Text>
          </View>
          <View>
            <Text typo="label-md" weight={600} textAlign="right">
              -{priceFormate(item.amount, 0)}
            </Text>
            <Text color="gray-600" textAlign="right">
              {percentageFormate(
                Number((item.amount / totalAmount).toFixed(1)),
              )}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [totalAmount],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Transaction>) => {
      return <ActivityItemShort key={item.id} transaction={item} />;
    },
    [],
  );

  const selectedMetric = data?.metrics[selectedIndex]?.data ?? [];
  if (isLoading) return <EmptyList {...emptyLists['placeholder']} />;
  if (!isLoading && !totalAmount) {
    return <EmptyList {...emptyLists['activity_all']} />;
  }
  return (
    <Layout>
      <View style={styles.container}>
        <DonutChart
          theme={{
            background: 'transparent',
          }}
          selectedIndex={selectedIndex === -1 ? undefined : selectedIndex}
          centerLabel={renderCenterLabel}
          colors={colors}
          data={data?.metrics ?? []}
          legend={false}
          valueKey="amount"
          labelKey="metric"
          width={screenWidth - 32}
          height={(screenWidth - 32) * 0.6}
          interaction={{
            onSelect: e => setSelectedIndex(e.index),
            onDeselect: () => setSelectedIndex(-1),
          }}
        />

        <LiquidGlassView effect="clear" style={styles.section}>
          <Text typo="label-lg">Expense categories</Text>
          <Separator />
          <FlatList
            keyExtractor={item => item.metric}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={data?.metrics ?? []}
            ItemSeparatorComponent={
              <View style={styles.separator}>
                <Separator />
              </View>
            }
            renderItem={renderItemCategory}
          />
        </LiquidGlassView>

        {selectedMetric.length > 0 && (
          <>
            <BarChart
              theme={{
                background: 'transparent',
                plotBackground: 'transparent',
                grid: themeColors['gray-300'],
                typography: {
                  fontFamily: 'PlusJakartaSans-Regular',
                  axisLabelSize: 12,
                },
              }}
              data={activityChartFormate(selectedMetric)}
              xKey="date"
              yKey="total"
              width={screenWidth - 32}
              height={(screenWidth - 32) * 0.6}
              renderBar={({ bar, radius }) => (
                <Rect
                  {...bar}
                  key={bar.key}
                  rx={radius}
                  fill={themeColors['brand-600']}
                />
              )}
            />
            <LiquidGlassView effect="clear" style={styles.section}>
              <Text typo="label-lg">Transactions</Text>
              <Separator />
              <FlatList
                key={selectedIndex}
                scrollEnabled={false}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                data={selectedMetric}
                renderItem={renderItem}
              />
            </LiquidGlassView>
          </>
        )}
      </View>
    </Layout>
  );
}
