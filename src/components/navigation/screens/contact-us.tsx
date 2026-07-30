import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import {
  Buildings,
  ClockCircle,
  Letter,
  Phone,
} from '@solar-icons/react-native/Linear';
import { useCallback } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 20,
  },
  btn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_wrap: {
    width: '100%',
  },
  btn_bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  btn_cont: {
    gap: 8,
  },
});

export function ContactUsScreen() {
  const onAddressPress = useCallback(() => {
    const encodedAddress = encodeURIComponent(
      '123 Financial District, Suite 500, New York, NY 10005',
    );
    const url = Platform.select({
      ios: `maps://?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
    });
    if (!url) return;
    Linking.openURL(url);
  }, []);

  const onEmailPress = useCallback(() => {
    Linking.openURL('mailto:support@vault.com');
  }, []);

  const onPhonePress = useCallback((phone: string) => {
    const cleanedNumber = phone.replace(/[^\d+]/g, '');
    const url = `tel:${cleanedNumber}`;
    Linking.openURL(url);
  }, []);

  const handlePhoneAlert = useCallback(() => {
    Alert.alert('', undefined, [
      {
        text: 'International: +1 (316) 555-0116',
        onPress: () => onPhonePress('+1 (316) 555-0116'),
      },
      {
        text: 'UK/Europe: +44 20 7946 0192',
        onPress: () => onPhonePress('+44 20 7946 0192'),
      },
    ]);
  }, [onPhonePress]);

  return (
    <>
      <HeaderDetails position="left" title="Contact Us" />
      <Layout>
        <View style={styles.container}>
          <GlassButton
            style={styles.btn}
            wrapperStyle={styles.btn_wrap}
            iconLeft={
              <Letter color={themeConfig.colors['gray-900']} size={32} />
            }
            onPress={onEmailPress}
            iconRight={
              <View style={styles.btn_cont}>
                <Text textAlign="center" weight={600} typo="label-lg">
                  Email Support
                </Text>
                <Text typo="label-md" weight={500} textAlign="center">
                  support@vault.com
                </Text>
                <View style={styles.btn_bottom}>
                  <ClockCircle
                    color={themeConfig.colors['gray-900']}
                    size={16}
                  />
                  <Text typo="label-md" weight={500} textAlign="center">
                    Within 12–24 hours
                  </Text>
                </View>
              </View>
            }
          />
          <GlassButton
            style={styles.btn}
            wrapperStyle={styles.btn_wrap}
            iconLeft={
              <Phone size={32} color={themeConfig.colors['gray-900']} />
            }
            onPress={handlePhoneAlert}
            iconRight={
              <View style={styles.btn_cont}>
                <Text textAlign="center" weight={600} typo="label-lg">
                  Phone Support
                </Text>
                <Text typo="label-md" weight={500} textAlign="center">
                  International: +1 (316) 555-0116
                </Text>
                <Text typo="label-md" weight={500} textAlign="center">
                  UK/Europe: +44 20 7946 0192
                </Text>
                <View style={styles.btn_bottom}>
                  <ClockCircle
                    color={themeConfig.colors['gray-900']}
                    size={16}
                  />
                  <Text typo="label-md" weight={500} textAlign="center">
                    Monday – Friday, 8:00 AM – 6:00 PM EST
                  </Text>
                </View>
              </View>
            }
          />
          <GlassButton
            style={styles.btn}
            wrapperStyle={styles.btn_wrap}
            onPress={onAddressPress}
            iconLeft={
              <Buildings size={32} color={themeConfig.colors['gray-900']} />
            }
            iconRight={
              <View style={styles.btn_cont}>
                <Text textAlign="center" weight={600} typo="label-lg">
                  Corporate Office
                </Text>
                <Text typo="label-md" weight={500} textAlign="center">
                  Mailing Address: 123 Financial District, Suite 500, New York,
                  NY 10005
                </Text>
              </View>
            }
          />
        </View>
      </Layout>
    </>
  );
}
