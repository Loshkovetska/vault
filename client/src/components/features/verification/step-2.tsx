import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  block: {
    padding: 16,
    gap: 16,
  },
});

type Step2Props = {
  document_type: string;
  onDocumentTypeChange: (v: string) => void;
};

const documents = {
  national_id: 'National ID',
  passport: 'Passport',
  driver_id: 'Driver License',
};

export function Step2({ document_type, onDocumentTypeChange }: Step2Props) {
  return (
    <View style={styles.block}>
      <Text typo="display-xs" weight={600}>
        Please prepare the following:
      </Text>
      <RadioGroup value={document_type} onValueChange={onDocumentTypeChange}>
        {Object.entries(documents).map(([k, v]) => (
          <RadioGroupItem id={k} key={k}>
            {v}
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </View>
  );
}
