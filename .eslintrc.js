module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  'rules': {
    camelcase: 0,
    'no-unused-expressions': 0,
    'comma-dangle': 0
  },
  'parserOptions': {
    'parser': 'babel-eslint'
  }
}
