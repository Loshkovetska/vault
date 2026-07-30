import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { themeConfig } from '@/lib/theme';
import { Bell, Card } from '@solar-icons/react-native/Linear';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  left: {
    gap: 8,
  },
  right: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors['gray-900'],
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type HeaderProps = {
  title: string;
  subtitle?: string;
  notification?: boolean;
};

export function Header({ title, subtitle, notification = true }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { goToCard, goToScreen } = useNavigate();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View style={styles.left}>
        <Text
          typo={subtitle ? 'display-xs' : 'display-sm'}
          weight={subtitle ? 500 : 600}
        >
          {title}
        </Text>
        {subtitle && <Text typo="text-md">{subtitle}</Text>}
      </View>
      <View style={styles.right}>
        {notification && (
          <GlassButton
            size="circle_sm"
            rounded="full"
            onPress={() => goToScreen('Notifications')}
            iconLeft={<Bell size={24} color={themeConfig.colors['gray-900']} />}
          />
        )}
        <GlassButton
          size="icon_left"
          onPress={goToCard}
          iconLeft={
            <View style={styles.icon}>
              <Card size={24} color={themeConfig.colors['gray-0']} />
            </View>
          }
        >
          My Card
        </GlassButton>
      </View>
    </View>
  );
}
