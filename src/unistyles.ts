import { StyleSheet } from 'react-native-unistyles';
import { themeConfig } from './lib/theme';

type AppThemes = {
  name: typeof themeConfig;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    name: themeConfig,
  },
});
