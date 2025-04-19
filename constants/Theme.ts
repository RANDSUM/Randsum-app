import { MD3DarkTheme } from 'react-native-paper'

const materialDarkColors = {
  ...MD3DarkTheme.colors,
  // Rich Purple (Primary)
  primary: '#6750A4',
  primaryContainer: '#EADDFF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005E',

  // Muted Gold (Secondary - subtle complement to purple)
  secondary: '#CAC4D0',
  secondaryContainer: '#E8DEF8',
  onSecondary: '#1D192B',
  onSecondaryContainer: '#332D41',

  // Soft Lavender (Tertiary - lighter tint of purple family)
  tertiary: '#9A82DB',
  tertiaryContainer: '#E6DEFF',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#21005E',

  background: '#1C1B1F',
  onBackground: '#E6E1E5',
  surface: '#1C1B1F',
  elevation: {
    level0: '#1C1B1F',
    level1: '#211F26',
    level2: '#27252D',
    level3: '#2D2B34',
    level4: '#33303B',
    level5: '#393642'
  },
  onSurface: '#E6E1E5',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',

  error: '#F2B8B5',
  errorContainer: '#8C1D18',
  onError: '#601410',
  onErrorContainer: '#F9DEDC',

  outline: '#938F99',
  outlineVariant: '#49454F',
  inverseSurface: '#E6E1E5',
  inverseOnSurface: '#1C1B1F',
  inversePrimary: '#6750A4',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(230, 225, 229, 0.12)',
  onSurfaceDisabled: 'rgba(230, 225, 229, 0.38)',
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
