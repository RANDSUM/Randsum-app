import { CustomDarkTheme } from '@/constants/Theme'
import { MD3Theme, useTheme } from 'react-native-paper'

export function useAppTheme() {
  return useTheme<MD3Theme>(CustomDarkTheme)
}
