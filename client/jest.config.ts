import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  preset: 'react-native',
  setupFilesAfterEnv: [`<rootDir>/jest.polyfills.cjs`],
  setupFiles: [`<rootDir>/jest/setup.tsx`],

  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'mjs',
    'cjs',
  ],

  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs|cjs)$': 'babel-jest',
  },

  moduleNameMapper: {
    '^@/((?!node_modules).*)$': '<rootDir>/src/$1',
    '^@reduxjs/toolkit/query/react$': require.resolve(
      '@reduxjs/toolkit/query/react',
    ),
    '^@reduxjs/toolkit$': require.resolve('@reduxjs/toolkit'),
    '^react-redux$': require.resolve('react-redux'),
    '^immer$': require.resolve('immer'),
  },

  transformIgnorePatterns: [
    // Added @invertase to the exception lookahead list
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@react-navigation|msw|rettime|until-async|@open-draft|@reduxjs|react-redux|immer|@invertase)',
  ],

  watchman: true,
  verbose: false,
};

export default config;
