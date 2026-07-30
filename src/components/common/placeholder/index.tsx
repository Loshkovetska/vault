import { emptyLists } from '@/lib/constants/empty-lists';
import { EmptyList } from '../empty-list';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useMemo } from 'react';
import { PlaceholderTitle } from './title';
import { screenWidth } from '@/lib/utils/device';

type PlaceholderType =
  | 'default'
  | 'recent-activity'
  | 'promo-widget'
  | 'activity-details'
  | 'promo-details';

const styles = StyleSheet.create(theme => ({
  empty: { paddingVertical: 8 },
  default: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  'promo-widget': {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  'recent-activity': { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  'activity-details': {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'promo-details': {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'promo-carousel': {
    width: screenWidth - 32,
    height: screenWidth * 0.6,
    borderColor: theme.colors['gray-500'],
    borderWidth: 1,
    borderRadius: 16,
  },
  'recent-item': {
    borderColor: theme.colors['gray-500'],
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  gap12: { gap: 12 },
}));

export function Placeholder({ type = 'default' }: { type?: PlaceholderType }) {
  const placeholder = useMemo(() => {
    switch (type) {
      case 'promo-widget':
        return (
          <>
            <View style={styles.row}>
              <PlaceholderTitle />
              <PlaceholderTitle size="sm" />
            </View>
            <View style={styles['promo-carousel']} />
          </>
        );
      case 'recent-activity':
        return (
          <>
            <View style={styles.row}>
              <PlaceholderTitle />
              <PlaceholderTitle size="sm" />
            </View>
            {Array.from({ length: 2 }, (_, idx) => idx).map(item => (
              <View
                key={`recent-placeholder-${item}`}
                style={styles['recent-item']}
              >
                <View style={styles.gap12}>
                  <PlaceholderTitle size="md" />
                  <PlaceholderTitle size="sm" />
                </View>
                <PlaceholderTitle size="lg" />
              </View>
            ))}
          </>
        );
      case 'activity-details':
      case 'promo-details':
        return <ActivityIndicator size="large" />;
      case 'default':
      default:
        return (
          <EmptyList {...emptyLists['placeholder']} style={styles.empty} />
        );
    }
  }, [type]);
  return <View style={styles[type]}>{placeholder}</View>;
}
