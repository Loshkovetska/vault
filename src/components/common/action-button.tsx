import { View } from 'react-native';
import { GlassButton } from '../ui/glass-button';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../ui/text';

const styles = StyleSheet.create({
  bottom: { padding: 16, minHeight: 80, gap: 20 },
  submit: { height: 48 },
});

type ActionButtonProps = {
  disabled?: boolean;
  text?: string;
  onPress: () => void;
};
export function ActionButton({
  disabled,
  children,
  text,
  onPress,
}: React.PropsWithChildren<ActionButtonProps>) {
  return (
    <View style={styles.bottom}>
      {text && (
        <Text textAlign="center" typo="label-xl" weight={500}>
          {text}
        </Text>
      )}
      <GlassButton
        typo="label-lg"
        variant="selected"
        style={styles.submit}
        disabled={disabled}
        onPress={onPress}
      >
        {children}
      </GlassButton>
    </View>
  );
}
