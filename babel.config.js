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
            '@': './',
            '@components': './components',
            '@store': './store',
            '@utils': './utils',
            '@types': './types',
            '@constants': './constants',
            '@assets': './assets',
            '@hooks': './hooks'
          }
        }
      ],
      'expo-router/babel',
      'react-native-reanimated/plugin'
    ]
  }
}
