import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/text';
import { AltArrowLeft } from '@solar-icons/react-native/Linear';
import { themeConfig } from '@/lib/theme';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { StyleSheet } from 'react-native-unistyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderDetailsProps = {
  title: string;
  position?: 'left' | 'center' | 'between';
  backVisible?: boolean;
  onBack?: () => void;
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: theme.colors['gray-300'],
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  position_center: {
    justifyContent: 'center',
  },
  position_left: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  position_between: {
    justifyContent: 'space-between',
    gap: 12,
  },
  btn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_position_center: {
    position: 'absolute',
    top: 20,
    left: 16,
  },
  btn_position_left: {},
  btn_position_between: {},
}));

export function HeaderDetails({
  title,
  position = 'center',
  backVisible = true,
  onBack,
}: HeaderDetailsProps) {
  const { goBack } = useNavigate();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        styles[`position_${position}`],
        { marginTop: insets.top },
      ]}
    >
      {backVisible && (
        <TouchableOpacity
          style={[styles.btn, styles[`btn_position_${position}`]]}
          onPress={onBack ?? goBack}
        >
          <AltArrowLeft size={24} color={themeConfig.colors['gray-900']} />
        </TouchableOpacity>
      )}
      <Text typo="display-xs" weight={600} textAlign="center">
        {title}
      </Text>
    </View>
  );
}
