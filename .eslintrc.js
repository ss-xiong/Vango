module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.config.beta.js',
      },
    },
  },
  globals: {},
  rules: {
    // "off" 或 0 - 关闭，不校验该规则
    // "warn" 或 1 - 警告，不影响 exit code
    // "error" 或 2 - 错误，触发该规则时 exit code 为 1
    // 解决 '@typescript-eslint 报错React use before defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // 允许使用jsx的文件后缀，也就是jsx/tsx允许使用jsx, 其他不允许使用
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    // js/jsx/ts/jsx不允许带有后缀, 其他需要
    'import/extensions': [2, 'always', {
      ignorePackages: true,
      pattern: {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    }],
  },
};
