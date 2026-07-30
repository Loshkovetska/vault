import { createContext, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text, TextProps } from './text';

type RadioGroupProps = {
  value: string;
  onValueChange: (v: string) => void;
};

const RadioContext = createContext({
  value: '',
  onValueChange: (_: string) => {},
});

const styles = StyleSheet.create(theme => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: theme.colors['gray-300'],
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio_selected: {
    borderColor: theme.colors['brand-400'],
  },
  disabled: {
    opacity: 0.5,
  },
  radio_dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors['brand-400'],
  },
}));

type RadioGroupItemProps = {
  id: string;
  disabled?: boolean;
  textProps?: TextProps;
};

export function RadioGroupItem({
  id,
  disabled,
  children,
  textProps,
}: React.PropsWithChildren<RadioGroupItemProps>) {
  const { value, onValueChange } = useContext(RadioContext);
  const isSelected = value === id;
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.item, ...(disabled ? [styles.disabled] : [])]}
      onPress={() => onValueChange(id)}
    >
      <View
        style={[styles.radio, ...(isSelected ? [styles.radio_selected] : [])]}
      >
        {isSelected && <View style={styles.radio_dot} />}
      </View>
      <Text typo="label-sm" weight={500} {...textProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function RadioGroup({
  children,
  value,
  onValueChange,
}: React.PropsWithChildren<RadioGroupProps>) {
  return (
    <RadioContext.Provider value={{ value, onValueChange }}>
      {children}
    </RadioContext.Provider>
  );
}
