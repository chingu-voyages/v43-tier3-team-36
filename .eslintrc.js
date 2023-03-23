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
          'never',
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
        // ignore need to include import of react
        'react/react-in-jsx-scope': 'off',
        // ignore prop types since typescript is being used
        'react/prop-types': 'off',
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
      files: './packages/backend/src/**',
      env: {
        node: true,
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './packages/*/tsconfig.json',
      },
      extends: ['airbnb/base', 'airbnb-typescript/base'],
      rules: {
        'import/prefer-default-export': 'off',
        // allow console usage
        'no-console': 'off',
        // allow unused variables within scope of files
        '@typescript-eslint/no-unused-vars': 'off',
        // allow local variable scoping
        '@typescript-eslint/no-shadow': 'off',
        // Carl's function preferences - not mine!
        'func-names': 'off',
        'consistent-return': 'off',
        'prefer-arrow-callback': 'off',
        "linebreak-style": 0,
      },
    },
  ],
};
