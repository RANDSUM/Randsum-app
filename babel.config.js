module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './components',
            '@store': './store',
            '@utils': './utils',
            '@types': './types',
            '@constants': './constants',
            '@assets': './assets'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  }
}
