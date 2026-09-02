import { useCallback, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { onboardingSteps } from './constants';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '@/components/ui/text';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ArrowRight } from '@solar-icons/react-native/Linear';
import { themeConfig } from '@/lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassButton } from '@/components/ui/glass-button';
import { useNavigate } from '@/lib/hooks/use-navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/lib/constants/keys';

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 20,
    gap: 8,
  },
  v_content: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    gap: 20,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: { width: 40, height: 8, borderRadius: 7 },
  dot_default: {
    backgroundColor: theme.colors['gray-300'],
  },
  dot_active: {
    backgroundColor: theme.colors['brand-400'],
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  bottom_content: { gap: 74 },
  btn: {
    width: 24,
    height: 24,
  },
}));

export function Onboarding() {
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();

  const { goToScreen } = useNavigate();

  const content = onboardingSteps[step as 0];

  const onStep = useCallback((num: number) => setStep(prev => prev + num), []);

  const onSkip = useCallback(() => {
    goToScreen('SignIn');
    AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED_ID, 'true');
  }, [goToScreen]);
  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: content.image_url }}
    >
      <LinearGradient
        colors={['#0B0B0E', '#0B0B0E', 'transparent', '#0B0B0E']}
        style={styles.gradient}
        useAngle
        angle={0}
      >
        <View style={styles.v_content}>
          <View style={[styles.header, { marginTop: insets.top }]}>
            {step > 0 && (
              <>
                <TouchableOpacity style={styles.btn} onPress={() => onStep(-1)}>
                  <ArrowLeft size={24} color={themeConfig.colors['gray-900']} />
                </TouchableOpacity>
                <Text typo="display-xs" weight={600}>
                  Back
                </Text>
              </>
            )}
          </View>
          <View style={styles.bottom_content}>
            <View style={styles.content}>
              <Text typo="display-md" weight={600}>
                {content.title}
              </Text>
              <Text typo="text-xl" weight={500} color="gray-600">
                {content.text}
              </Text>
              <View style={styles.dots}>
                {Object.keys(onboardingSteps).map(st => (
                  <View
                    key={`dot_${st}`}
                    style={[
                      styles.dot,
                      styles[
                        `dot_${step >= Number(st) ? 'active' : 'default'}`
                      ],
                    ]}
                  />
                ))}
              </View>
            </View>
            <View style={[styles.bottom, { marginBottom: insets.bottom }]}>
              <GlassButton onPress={onSkip}>Skip</GlassButton>
              <GlassButton
                variant="selected"
                size="icon_right"
                onPress={step === 2 ? onSkip : () => onStep(1)}
                iconRight={
                  <ArrowRight
                    size={16}
                    color={themeConfig.colors['gray-900']}
                  />
                }
              >
                Next
              </GlassButton>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
