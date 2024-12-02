module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  extends: [
    'eslint:recommended', // Uses the recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Uses the recommended rules from eslint-plugin-react
    'plugin:react-native/all', // Uses the recommended rules from eslint-plugin-react-native
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    'prettier/@typescript-eslint', // Disables ESLint rules that might conflict with prettier
    'prettier/react', // Disables ESLint rules that might conflict with prettier for React
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  rules: {
    // TypeScript Rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Error on unused vars but ignore underscore-prefixed vars
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Don't require return type on functions
    '@typescript-eslint/no-explicit-any': 'warn', // Warn on use of `any` type

    // React & React Native Rules
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // Enforce using .tsx files for JSX
    'react/prop-types': 'off', // Disable prop-types since we're using TypeScript
    'react/react-in-jsx-scope': 'off', // React is automatically in scope with React Native projects

    // Prettier rules
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier configuration to avoid line ending issues

    // React Native Specific Rules
    'react-native/no-inline-styles': 'warn', // Warn when using inline styles (use StyleSheet instead)
    'react-native/no-unused-styles': 'error', // Error on unused styles
    'react-native/split-platform-components': 'off', // Disable forcing platform-specific component splitting
    'react-native/no-single-element-style-arrays': 'error', // Avoid using single-element arrays in style prop
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
