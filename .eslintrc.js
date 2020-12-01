module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'never'],
    'object-shorthand': ['warn', 'consistent'],
    'func-names': 0,
    'linebreak-style': 0,
    'wrap-iife': ['error', 'inside'],
    'no-undef': 1,
    'prefer-arrow-callback': 0,
  },
};
