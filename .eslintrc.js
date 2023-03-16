module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/dot-notation': 'off',
    'dot-notation': 'error',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/no-implied-eval': 'off',
    'no-implied-eval': 'error',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/no-throw-literal': 'off',
    'no-throw-literal': 'error',
    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/return-await': 'off',
    'no-return-await': 'error',
    // disabled for compatibility with mongoDB objects including "_id"
    'no-underscore-dangle': 'off',
  },
};
