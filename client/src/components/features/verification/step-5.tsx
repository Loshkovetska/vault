// import { Camera } from 'react-native-vision-camera';

import { Progress } from '@/assets/icons/progress';
import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { useProgress } from '@/lib/hooks/use-progress';
import { themeConfig } from '@/lib/theme';
import { GalleryEdit } from '@solar-icons/react-native/Linear';
import { useCallback } from 'react';
import { ImageBackground, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  block: {
    paddingHorizontal: 16,
    gap: 32,
    paddingVertical: 70,
  },
  icon: { alignSelf: 'center' },
  sub: { gap: 16 },
  selfie: {
    width: 208,
    height: 208,
    borderRadius: 104,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  selfie_process: {},
  selfie_default: {
    backgroundColor: theme.colors['gray-300'],
  },
  btn: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: 2,
    transform: [{ rotate: '-90deg' }],
  },
  topImg: {
    width: 170,
    height: 170,
    zIndex: -1,
    position: 'absolute',
  },
}));

type Step5Props = {
  selfie: string;
  onSelfieChange: (v: string) => void;
  onNext: () => void;
};

export function Step5({ selfie, onSelfieChange, onNext }: Step5Props) {
  const progress = useProgress(!!selfie, onNext);

  const onUpload = useCallback(() => {
    launchImageLibrary({ quality: 0.7, mediaType: 'photo' }).then(v => {
      onSelfieChange(v.assets?.[0]?.uri ?? '');
    });
  }, [onSelfieChange]);
  return (
    <View style={styles.block}>
      <View
        style={[
          styles.selfie,
          styles[`selfie_${selfie ? 'process' : 'default'}`],
        ]}
      >
        {selfie ? (
          <ImageBackground
            source={{ uri: selfie }}
            style={{ width: '100%', height: '100%' }}
          >
            <Progress progress={progress} style={styles.progress} />
          </ImageBackground>
        ) : (
          <GlassButton
            testID="selfie-picker"
            style={styles.btn}
            size="circle_sm"
            variant="selected"
            onPress={onUpload}
            iconLeft={
              <GalleryEdit size={24} color={themeConfig.colors['gray-900']} />
            }
          />
        )}
      </View>
      {selfie && progress !== 100 && (
        <Text typo="display-sm" textAlign="center" weight={600}>
          Wait a Moment
        </Text>
      )}
    </View>
  );
  //   return <Camera isActive device="front" />;
}
