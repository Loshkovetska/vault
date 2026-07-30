// App.jsx
import {
  CheckCircle,
  DangerCircle,
  DangerTriangle,
} from '@solar-icons/react-native/Bold';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';
import { themeConfig } from '.';

const styles = StyleSheet.create(theme => ({
  toast: {
    borderRadius: 100,
    borderWidth: 0,
    borderLeftWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  toast_container: {
    alignItems: 'flex-start',
    padding: 0,
    paddingHorizontal: 0,
    gap: 1,
  },
  toast_success: {
    backgroundColor: theme.colors['success-900'],
  },
  toast_error: {
    backgroundColor: theme.colors['error-900'],
  },
  toast_info: {
    backgroundColor: theme.colors['brand-900'],
  },
  toast_warn: {
    backgroundColor: theme.colors['warn-900'],
  },
  title: {
    ...theme.typography['label-md'],
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: 0,
  },
  description: {
    ...theme.typography['text-xxs'],
    fontFamily: 'PlusJakartaSans-Regular',
  },
}));

export const toastConfig = (insetTop: number) => ({
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.toast_success]}
      renderLeadingIcon={() => (
        <CheckCircle color={themeConfig.colors['success-400']} />
      )}
      contentContainerStyle={styles.toast_container}
      text1Style={styles.title}
      text2Style={styles.description}
    />
  ),
  warn: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.toast_warn, { marginTop: insetTop }]}
      renderLeadingIcon={() => (
        <DangerTriangle color={themeConfig.colors['warn-400']} />
      )}
      contentContainerStyle={styles.toast_container}
      text1Style={styles.title}
      text2Style={styles.description}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.toast_error, { marginTop: insetTop }]}
      renderLeadingIcon={() => (
        <DangerCircle color={themeConfig.colors['error-400']} />
      )}
      contentContainerStyle={styles.toast_container}
      text1Style={styles.title}
      text2Style={styles.description}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.toast_info, { marginTop: insetTop }]}
      renderLeadingIcon={() => (
        <DangerCircle color={themeConfig.colors['brand-400']} />
      )}
      contentContainerStyle={styles.toast_container}
      text1Style={styles.title}
      text2Style={styles.description}
    />
  ),
});
