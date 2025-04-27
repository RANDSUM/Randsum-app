import { CustomDarkTheme } from '@/constants/Theme'
import { Provider as PaperProvider } from 'react-native-paper'

type ThemeProviderProps = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <PaperProvider theme={CustomDarkTheme}>{children}</PaperProvider>
}
