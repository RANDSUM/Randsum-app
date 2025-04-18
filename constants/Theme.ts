import { MD3DarkTheme } from 'react-native-paper'

const materialDarkColors = {
  ...MD3DarkTheme.colors,
  primary: '#5C6BC0',
  primaryContainer: '#3949AB',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#E8EAF6',

  secondary: '#78909C',
  secondaryContainer: '#546E7A',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#ECEFF1',

  tertiary: '#26A69A',
  tertiaryContainer: '#00897B',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#E0F2F1',

  background: '#1E1E1E',
  onBackground: '#EEEEEE',
  surface: '#1E1E1E',
  elevation: {
    level0: '#1E1E1E',
    level1: '#252525',
    level2: '#2A2A2A',
    level3: '#2F2F2F',
    level4: '#353535',
    level5: '#3A3A3A'
  },
  onSurface: '#EEEEEE',
  surfaceVariant: '#3D3D3D',
  onSurfaceVariant: '#EEEEEE',

  error: '#F44336',
  errorContainer: '#D32F2F',
  onError: '#FFFFFF',
  onErrorContainer: '#FFCDD2',

  outline: '#5C6BC0',
  outlineVariant: '#3949AB',
  inverseSurface: '#EEEEEE',
  inverseOnSurface: '#1E1E1E',
  inversePrimary: '#3F51B5',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(238, 238, 238, 0.12)',
  onSurfaceDisabled: 'rgba(238, 238, 238, 0.38)',
  backdrop: 'rgba(0, 0, 0, 0.6)'
}

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...materialDarkColors
  },
  roundness: 4,
  animation: {
    scale: 1.0
  }
}
