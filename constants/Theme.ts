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

  background: '#121212',
  onBackground: '#EEEEEE',
  surface: '#121212',
  elevation: {
    level0: '#121212',
    level1: '#1D1D1D',
    level2: '#222222',
    level3: '#242424',
    level4: '#272727',
    level5: '#2C2C2C'
  },
  onSurface: '#EEEEEE',
  surfaceVariant: '#303030',
  onSurfaceVariant: '#EEEEEE',

  error: '#8B0000',
  errorContainer: '#5C0000',
  onError: '#FFFFFF',
  onErrorContainer: '#FFCDD2',

  outline: '#4B0082',
  outlineVariant: '#380064',
  inverseSurface: '#EEEEEE',
  inverseOnSurface: '#121212',
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
