module.exports = {
  root: true,
  extends: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {},
  overrides: [
    {
      files: './packages/frontend/src/**',
      env: {
        browser: true,
        es6: true,
      },
      extends: ['airbnb', 'airbnb-typescript/base', 'airbnb/hooks'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './packages/*/tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.mjs', '.js', '.json', '.ts', '.tsx', '.d.ts'],
          },
        },
      },
      plugins: ['react'],
      rules: {
        // Ignore js,ts,tsx required file extention imports
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        // prefer named arrow-function components
        'react/function-component-definition': [
          'error',
          { namedComponents: 'arrow-function' },
        ],
        // airbnb is using .jsx
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        // enforces premature optimization
        'react/jsx-no-bind': 'off',
        // use ES6+ deconstructed inner props instead of defaultProps
        'react/require-default-props': 'off',
      },
    },
    // use testing library linting rules for appropriate test files
    {
      files: [
        './packages/frontend/**/__tests__/**/*.([jt]s|tsx)',
        './packages/frontend/**/?(*.)+(spec|test).([jt]s|tsx)',
      ],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: './packages/frontend/cypress/?(*.)cy.[jt]s',
      extends: ['plugin:cypress/recommended'],
    },
    {
      env: {
        node: true,
      },
      files: './packages/backend/*',
      extends: ['airbnb/base', 'airbnb-typescript/base'],
      rules: {},
    },
  ],
};
