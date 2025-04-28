module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier'],
  settings: {
    'import/ignore': ['react-native']
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
