import { createContext, useCallback, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GlassButton } from './glass-button';
import { AltArrowDown, AltArrowUp } from '@solar-icons/react-native/Linear';
import { themeConfig } from '@/lib/theme';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from './text';
import { Dialog } from './dialog';

type SelectContentProps = {
  open: boolean;
  value: string;
  onValueChange: (v: string) => void;
  onOpenChange: () => void;
};

const SelectContext = createContext<SelectContentProps>({
  open: false,
  value: '',
  onOpenChange: () => {},
  onValueChange: () => {},
});

export function SelectTrigger({
  children,
  testID,
}: React.PropsWithChildren<{ testID?: string }>) {
  const { open, onOpenChange } = useContext(SelectContext);

  const Icon = open ? AltArrowUp : AltArrowDown;
  return (
    <GlassButton
      testID={testID}
      activeOpacity={0.8}
      wrapperStyle={{ flex: 1 }}
      style={{ justifyContent: 'space-between' }}
      iconRight={<Icon size={24} color={themeConfig.colors['gray-900']} />}
      onPress={onOpenChange}
    >
      {children}
    </GlassButton>
  );
}
type SelectItemProps = {
  id: string;
};

const styles = StyleSheet.create(theme => ({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  item_default: { backgroundColor: theme.colors['gray-900'] },
  item_selected: {
    backgroundColor: theme.colors['brand-400'],
  },
}));
export function SelectItem({
  id,
  children,
}: React.PropsWithChildren<SelectItemProps>) {
  const { value, onValueChange } = useContext(SelectContext);

  const isSelected = id === value;

  const style = [
    styles.item,
    styles[`item_${isSelected ? 'selected' : 'default'}`],
  ];

  return (
    <TouchableOpacity
      testID={`select-option-${id}`}
      style={style}
      onPress={() => onValueChange(id)}
    >
      <Text
        typo="label-md"
        color={isSelected ? 'gray-900' : 'gray-0'}
        weight={500}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

type SelectProps = {
  value: string;
  onValueChange: (v: string) => void;
};

export function Select({
  children,
  value,
  onValueChange,
}: React.PropsWithChildren<SelectProps>) {
  const [open, setOpen] = useState(false);

  const onChange = useCallback(
    (v: string) => {
      onValueChange(v);
      setOpen(false);
    },
    [onValueChange],
  );
  return (
    <SelectContext.Provider
      value={{
        open,
        value,
        onValueChange: onChange,
        onOpenChange: () => setOpen(prev => !prev),
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export function SelectContent({ children }: React.PropsWithChildren) {
  const context = useContext(SelectContext);

  return <Dialog {...context}>{children}</Dialog>;
}
