import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-gesture-handler'
import 'react-native-reanimated'

import Footer from '@/components/Footer'
import { ThemeProvider, useAppTheme } from '@/components/Themed'
import { CurrentRollProvider } from '@/contexts/CurrentRollContext'
import { SavedRollsProvider } from '@/contexts/SavedRollsContext'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const theme = useAppTheme()

  return (
    <ThemeProvider>
      <SavedRollsProvider>
        <CurrentRollProvider>
          <StatusBar style="light" />
          <Slot />
          <Footer />
        </CurrentRollProvider>
      </SavedRollsProvider>
    </ThemeProvider>
  )
}
