import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import Footer from '@/components/Footer'
import { ThemeProvider, useAppTheme } from '@/components/Themed'
import { CurrentRollProvider } from '@/contexts/CurrentRollContext'

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
      <CurrentRollProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.elevation.level4
            },
            headerTintColor: theme.colors.onSurface,
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.colors.background
            }
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Dice Roller' }} />
          <Stack.Screen name="theme" options={{ title: 'Theme Demo' }} />
        </Stack>
        <Footer />
      </CurrentRollProvider>
    </ThemeProvider>
  )
}
