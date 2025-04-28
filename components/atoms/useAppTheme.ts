import { MD3Theme, useTheme } from 'react-native-paper'

import { CustomDarkTheme } from '@/constants/Theme'

export function useAppTheme() {
  return useTheme<MD3Theme>(CustomDarkTheme)
}
