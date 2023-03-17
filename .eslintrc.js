module.exports = {
  root: true,
  extends: ['airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './packages/*/tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {},
  overrides: [
    {
      files: './packages/frontend/**',
      env: {
        browser: true,
        es6: true,
      },
      extends: ['airbnb', 'airbnb/hooks'],
      parserOptions: {
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
    {
      env: {
        node: true,
      },
      files: './packages/backend/*',
      extends: ['airbnb/base'],
      rules: {},
    },
  ],
};
