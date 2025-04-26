import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
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
          <Stack
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="(drawer)" />

            <Stack.Screen
              name="dice-details"
              options={{
                presentation: 'modal',
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.elevation.level4
                },
                headerTintColor: theme.colors.onSurface,
                title: 'Die Details'
              }}
            />
            <Stack.Screen
              name="notation-input"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.elevation.level4
                },
                headerTintColor: theme.colors.onSurface,
                title: 'Custom Notation'
              }}
            />
          </Stack>
          <Footer />
        </CurrentRollProvider>
      </SavedRollsProvider>
    </ThemeProvider>
  )
}
