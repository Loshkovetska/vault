import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { Folder, GalleryEdit } from '@solar-icons/react-native/Linear';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { useCallback } from 'react';
import { GlassButton } from '@/components/ui/glass-button';

type Step3Props = {
  document: string | null;
  onDocumentChange: (v: string) => void;
};

const styles = StyleSheet.create(theme => ({
  block: {
    paddingHorizontal: 16,
    gap: 64,
    paddingVertical: 24,
  },
  picker_default: {
    borderColor: theme.colors['gray-300'],
    backgroundColor: theme.colors['gray-400'],
    padding: 24,
  },
  picker_selected: {},
  picker: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 271,
    height: 144,
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  sub: { gap: 16 },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  btn_wrap: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    zIndex: 1,
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
}));
export function Step3({ document, onDocumentChange }: Step3Props) {
  const onUpload = useCallback(() => {
    launchImageLibrary({
      quality: 0.7,
      mediaType: 'photo',
    }).then(v => onDocumentChange(v.assets?.[0].uri ?? ''));
  }, [onDocumentChange]);

  return (
    <View style={styles.block}>
      <Text typo="display-xs" textAlign="center" weight={600}>
        Upload front side of your ID
      </Text>
      <View
        style={[
          styles.picker,
          styles[`picker_${document ? 'selected' : 'default'}`],
        ]}
      >
        {document ? (
          <>
            <Image source={{ uri: document }} style={styles.image} />
            <GlassButton
              wrapperStyle={styles.btn_wrap}
              style={styles.btn}
              size="circle_sm"
              variant="selected"
              onPress={onUpload}
              iconLeft={
                <GalleryEdit size={20} color={themeConfig.colors['gray-900']} />
              }
            />
          </>
        ) : (
          <>
            <Folder size={24} color={themeConfig.colors['gray-900']} />
            <Text typo="text-xs" weight={800}>
              Click to Upload
            </Text>
            <Text typo="text-xs" color="gray-700">
              Supported file types: PNG, JPG, GIF
            </Text>
            <Button onPress={onUpload}>Upload</Button>
          </>
        )}
      </View>
      <View style={styles.sub}>
        <Text typo="text-lg" weight={500}>
          ✓ Clear
        </Text>
        <Text typo="text-lg" weight={500}>
          ✓ Readable{' '}
        </Text>
      </View>
    </View>
  );
}
