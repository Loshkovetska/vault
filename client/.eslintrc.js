module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  rules: {
    'testing-library/no-await-sync-events': [
      'error',
      { eventModules: ['fire-event'] },
    ],
  },
};
