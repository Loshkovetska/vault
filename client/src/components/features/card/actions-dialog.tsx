import { Dialog } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { Pen, TrashBin2 } from '@solar-icons/react-native/Linear';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type ActionsDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const styles = StyleSheet.create({
  action_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actions: {
    gap: 16,
  },
});

export function ActionsDialog({
  open,
  onOpenChange,
  onDelete,
  onEdit,
}: ActionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action_btn} onPress={onEdit}>
          <Pen size={20} color={themeConfig.colors['gray-0']} />
          <Text typo="label-md" weight={500} color="gray-0">
            Update information
          </Text>
        </TouchableOpacity>
        <Separator />
        <TouchableOpacity style={styles.action_btn} onPress={onDelete}>
          <TrashBin2 size={20} color={themeConfig.colors['error-400']} />
          <Text typo="label-md" weight={500} color="error-400">
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
}
