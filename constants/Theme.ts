import { MD3DarkTheme } from 'react-native-paper'

const materialDarkColors = {
  primary: '#4B0082',
  primaryContainer: '#380064',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#E6D8FF',

  secondary: '#FFD700',
  secondaryContainer: '#CC9900',
  onSecondary: '#000000',
  onSecondaryContainer: '#FFF8E1',

  tertiary: '#0047AB',
  tertiaryContainer: '#003380',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#D6E4FF',

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

  error: '#8B0000',
  errorContainer: '#5C0000',
  onError: '#FFFFFF',
  onErrorContainer: '#FFCDD2',

  outline: '#4B0082',
  outlineVariant: '#380064',
  inverseSurface: '#EEEEEE',
  inverseOnSurface: '#1E1E1E',
  inversePrimary: '#6A0DAD',
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
  roundness: 8,
  animation: {
    scale: 1.0
  }
}
