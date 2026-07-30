import { Input } from '@/components/ui/input';
import { Magnifier } from '@solar-icons/react-native/Linear';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ActivityTabs } from './activity-tabs';
import { TransactionFilter } from '@/lib/types/transaction';
import { themeConfig } from '@/lib/theme';
import { Header } from '@/components/common/header';

const styles = StyleSheet.create(() => ({
  container: {
    gap: 24,
    paddingBottom: 24,
  },
  input: {
    paddingHorizontal: 16,
  },
}));

type ActivityHeaderProps = {
  filter: TransactionFilter;
  search: string;
  onSearch: (v: string) => void;
  onFilter: (v: TransactionFilter) => void;
};

export function ActivityHeader({
  search,
  filter,
  onFilter,
  onSearch,
}: ActivityHeaderProps) {
  return (
    <>
      <Header title="Activity" />
      <View style={styles.container}>
        <View style={styles.input}>
          <Input
            value={search}
            placeholder="Search your activity"
            onChangeText={onSearch}
            iconLeft={
              <Magnifier size={24} color={themeConfig.colors['gray-900']} />
            }
          />
        </View>
        <ActivityTabs value={filter} onValueChange={onFilter} />
      </View>
    </>
  );
}
