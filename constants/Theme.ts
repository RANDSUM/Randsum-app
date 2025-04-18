import { MD3DarkTheme } from 'react-native-paper'

const materialDarkColors = {
  // Spooky purple as primary color
  primary: '#7D26CD', // Vibrant purple
  primaryContainer: '#38006b', // Deep purple
  onPrimary: '#E1E1E1', // Slightly off-white text on purple
  onPrimaryContainer: '#E6E6FA', // Light lavender

  // Spooky orange as secondary color
  secondary: '#FF6D00', // Pumpkin orange
  secondaryContainer: '#7A3300', // Dark orange/brown
  onSecondary: '#000000', // Black text on orange
  onSecondaryContainer: '#FFDBCC', // Light orange

  // Spooky green as tertiary color
  tertiary: '#50C878', // Toxic/slime green
  tertiaryContainer: '#004D25', // Dark green
  onTertiary: '#000000', // Black text on green
  onTertiaryContainer: '#B0FFD6', // Light green

  // Material Design compliant dark theme colors
  background: '#121212', // Material recommended dark background (not pure black)
  onBackground: '#E1E1E1', // Slightly off-white for better readability
  surface: '#121212', // Base surface color
  // Elevation overlays with white at different percentages
  elevation: {
    level0: '#121212', // 0% white overlay
    level1: '#1D1D1D', // 5% white overlay
    level2: '#222222', // 7% white overlay
    level3: '#242424', // 8% white overlay
    level4: '#272727', // 9% white overlay
    level5: '#2C2C2C' // 11% white overlay
  },
  onSurface: '#E1E1E1', // Slightly off-white for better readability
  surfaceVariant: '#303030', // Material Design surface variant
  onSurfaceVariant: '#E1E1E1', // Slightly off-white for better readability

  // Blood red for errors
  error: '#FF0000', // Blood red
  errorContainer: '#8B0000', // Dark red
  onError: '#E1E1E1', // Slightly off-white text on red
  onErrorContainer: '#FFCDD2', // Light red

  // Other colors
  outline: '#6A0DAD', // Purple outline
  outlineVariant: '#483D8B', // Dark slate blue
  inverseSurface: '#FFFFFF',
  inverseOnSurface: '#121212',
  inversePrimary: '#9370DB', // Medium purple
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
  onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
  backdrop: 'rgba(0, 0, 0, 0.6)' // Darker backdrop for spooky feel
}

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...materialDarkColors
  },
  roundness: 0, // Sharp corners for spooky feel
  animation: {
    scale: 1.0
  }
}
