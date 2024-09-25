const eslintConfigLove = require('eslint-config-love');

// Extract properties excluding `languageOptions`
const { languageOptions, ...restConfig } = eslintConfigLove;

module.exports = {
  root: true,
  ...restConfig, // Apply the rest of the configuration
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.html'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.app.json',
        sourceType: 'module'
      },
      rules: {
        'semi': 'off', // Use @typescript-eslint/semi instead
        '@typescript-eslint/semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-console': 'warn',
        'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
      }
    }
  ],
  plugins: [
    '@typescript-eslint',
    '@angular-eslint'
  ]
};