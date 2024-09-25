module.exports = {
  root: true,
  ...require('eslint-config-love'),
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
      }
    }
  ],
  plugins: [
    '@typescript-eslint',
    '@angular-eslint'
  ],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
}
