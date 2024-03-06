/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  ignorePatterns: [
    'dist',
    'node_modules',
    'tailwind.config.js',
    'postcss.config.js',
    'babel.config.js',
    'jest.config.js',
    'vue.config.js'
  ],
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
