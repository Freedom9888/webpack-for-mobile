// ESLint 9 flat config（替代旧的 .eslintrc.js，规则与原配置保持一致）
const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const prettier = require('eslint-plugin-prettier')
const eslintConfigPrettier = require('eslint-config-prettier')
const globals = require('globals')

module.exports = [
  {
    ignores: ['dist/', 'build/', 'node_modules/', '*.config.js']
  },
  js.configs.recommended,
  // @typescript-eslint 推荐配置（含 parser、no-undef 等基础规则在 TS 文件中的关闭）
  ...tseslint.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  },
  eslintConfigPrettier
]
