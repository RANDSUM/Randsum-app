import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper'

const materialLightColors = {
  primary: '#6200EE',
  primaryContainer: '#E8DEF8',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005E',

  secondary: '#FFD600',
  secondaryContainer: '#FFF8CC',
  onSecondary: '#000000',
  onSecondaryContainer: '#3F2E00',

  tertiary: '#424242',
  tertiaryContainer: '#E0E0E0',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#1C1C1C',

  background: '#FAFAFA',
  onBackground: '#1C1B1F',
  surface: '#FAFAFA',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',

  error: '#B00020',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#410002',

  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  inverseSurface: '#313033',
  inverseOnSurface: '#F4EFF4',
  inversePrimary: '#D0BCFF',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
  onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
  backdrop: 'rgba(44, 49, 55, 0.4)'
}

const materialDarkColors = {
  primary: '#D0BCFF',
  primaryContainer: '#4F378B',
  onPrimary: '#371E73',
  onPrimaryContainer: '#EADDFF',

  secondary: '#FFE629',
  secondaryContainer: '#635D00',
  onSecondary: '#000000',
  onSecondaryContainer: '#FFEEAB',

  tertiary: '#BDBDBD',
  tertiaryContainer: '#616161',
  onTertiary: '#000000',
  onTertiaryContainer: '#E0E0E0',

  background: '#1C1B1F',
  onBackground: '#E6E1E5',
  surface: '#1C1B1F',
  onSurface: '#E6E1E5',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',

  error: '#CF6679',
  errorContainer: '#8B0000',
  onError: '#000000',
  onErrorContainer: '#FFCDD2',

  outline: '#938F99',
  outlineVariant: '#49454F',
  inverseSurface: '#E6E1E5',
  inverseOnSurface: '#313033',
  inversePrimary: '#6200EE',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(230, 225, 229, 0.12)',
  onSurfaceDisabled: 'rgba(230, 225, 229, 0.38)',
  backdrop: 'rgba(51, 47, 55, 0.4)'
}

const fontConfig = {
  fontFamily: 'Bitter'
}

export const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...materialLightColors
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
  animation: {
    scale: 1.0
  }
}

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...materialDarkColors
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
  animation: {
    scale: 1.0
  }
}
