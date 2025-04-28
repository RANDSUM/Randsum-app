import { Provider as PaperProvider } from 'react-native-paper'

import { CustomDarkTheme } from '@/constants/Theme'

type ThemeProviderProps = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <PaperProvider theme={CustomDarkTheme}>{children}</PaperProvider>
}
