import { MD3DarkTheme } from 'react-native-paper'

const materialDarkColors = {
  primary: '#7D26CD',
  primaryContainer: '#38006b',
  onPrimary: '#E1E1E1',
  onPrimaryContainer: '#E6E6FA',

  secondary: '#FF6D00',
  secondaryContainer: '#7A3300',
  onSecondary: '#000000',
  onSecondaryContainer: '#FFDBCC',

  tertiary: '#50C878',
  tertiaryContainer: '#004D25',
  onTertiary: '#000000',
  onTertiaryContainer: '#B0FFD6',

  background: '#121212',
  onBackground: '#E1E1E1',
  surface: '#121212',
  elevation: {
    level0: '#121212',
    level1: '#1D1D1D',
    level2: '#222222',
    level3: '#242424',
    level4: '#272727',
    level5: '#2C2C2C'
  },
  onSurface: '#E1E1E1',
  surfaceVariant: '#303030',
  onSurfaceVariant: '#E1E1E1',

  error: '#FF0000',
  errorContainer: '#8B0000',
  onError: '#E1E1E1',
  onErrorContainer: '#FFCDD2',

  outline: '#6A0DAD',
  outlineVariant: '#483D8B',
  inverseSurface: '#FFFFFF',
  inverseOnSurface: '#121212',
  inversePrimary: '#9370DB',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
  onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
  backdrop: 'rgba(0, 0, 0, 0.6)'
}

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...materialDarkColors
  },
  roundness: 0,
  animation: {
    scale: 1.0
  }
}
