import { useState } from 'react';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { Dialog } from './dialog';
import { FormField, FormFieldProps } from '../common/form-field';
import { dateFormate } from '@/lib/utils/date';
import { CalendarViews } from 'node_modules/react-native-ui-datepicker/lib/typescript/enums';

type CalendarProps = {
  initialView?: CalendarViews;
} & FormFieldProps;

export function Calendar({
  value,
  initialView,
  onChangeText,
  ...rest
}: CalendarProps) {
  const defaultStyles = useDefaultStyles();
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <FormField
        {...rest}
        readOnly
        editable={false}
        value={value ? dateFormate(new Date(value)) : undefined}
        onPress={() => setOpen(true)}
      />
      <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
        <DateTimePicker
          mode="single"
          initialView={initialView}
          date={value ? new Date(value) : undefined}
          onChange={({ date }) =>
            onChangeText?.(new Date(date as number).toISOString())
          }
          styles={defaultStyles}
        />
      </Dialog>
    </>
  );
}
