import { FormField, FormRadio } from './form-field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Controller, Path, UseFormReturn } from 'react-hook-form';
import { PersonalInfoType } from '@/lib/constants/resolvers';
import { Calendar } from '../ui/calendar';

type PersonalInfoFormProps<
  T extends Omit<PersonalInfoType, 'image_url' | 'email'>,
> = {
  form: UseFormReturn<T>;
  withEmail?: boolean;
};

export function PersonalInfoForm<
  T extends Omit<PersonalInfoType, 'image_url' | 'email'>,
>({ form, withEmail = true }: PersonalInfoFormProps<T>) {
  return (
    <>
      <Controller
        control={form.control}
        name={'full_name' as Path<T>}
        render={({ field: { onChange, value }, fieldState }) => (
          <FormField
            label="Full Name"
            placeholder="Enter Full Name"
            error={fieldState.error?.message}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {withEmail && (
        <Controller
          control={form.control}
          name={'email' as Path<T>}
          render={({ field: { onChange, value }, fieldState }) => (
            <FormField
              label="Email"
              placeholder="Enter Email"
              keyboardType="email-address"
              error={fieldState?.error?.message}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      )}

      <Controller
        control={form.control}
        name={'bdate' as Path<T>}
        render={({ field: { onChange, value }, fieldState }) => (
          <Calendar
            label="Date of Birth"
            placeholder="Press to open calendar"
            initialView="year"
            error={fieldState.error?.message}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={form.control}
        name={'gender' as Path<T>}
        render={({ field: { onChange, value }, fieldState }) => (
          <FormRadio label="Gender" error={fieldState?.error?.message}>
            <RadioGroup value={value} onValueChange={onChange}>
              <RadioGroupItem id="Man">Man</RadioGroupItem>
              <RadioGroupItem id="Woman">Woman</RadioGroupItem>
            </RadioGroup>
          </FormRadio>
        )}
      />

      <Controller
        control={form.control}
        name={'nationality' as Path<T>}
        render={({ field: { onChange, value }, fieldState }) => (
          <FormField
            label="Nationality"
            placeholder="Enter Nationality"
            error={fieldState.error?.message}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
    </>
  );
}
