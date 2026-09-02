import { BankAccount } from '@/lib/types/card';
import { screenWidth } from '@/lib/utils/device';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../ui/text';
import { themeConfig } from '@/lib/theme';
import { prettifyAccount } from '@/lib/utils/string';
import { GlassButton } from '../ui/glass-button';
import { Settings } from '@solar-icons/react-native/Linear';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { BankUSA } from '@/assets/icons/bank-account';

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
    paddingTop: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 72,
    height: screenWidth * 0.5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: theme.colors['brand-500'],
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  settings: { position: 'absolute', top: 12, right: 20 },
}));

export function BankPreview({
  bankAccount,
  onPress,
}: {
  bankAccount: BankAccount;
  onPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <LiquidGlassView effect="clear" style={styles.image}>
        <View style={styles.header}>
          <BankUSA />
          <Text typo="label-xl">{bankAccount.name}</Text>
        </View>
        <Text typo="display-md">{prettifyAccount(bankAccount.account)}</Text>
      </LiquidGlassView>
      <GlassButton
        size="circle_xs"
        rounded="full"
        wrapperStyle={styles.settings}
        onPress={onPress}
        iconLeft={<Settings size={20} color={themeConfig.colors['gray-900']} />}
      />
    </View>
  );
}
