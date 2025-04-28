import { useAppTheme } from '@/components/atoms'
import {
  DiceDetailsModal,
  NotationInputModal,
  RollDetailsModal,
  RollResultsToast
} from '@/components/organisms'
import { Tabs } from 'expo-router/tabs'
import { StyleSheet } from 'react-native'

type TabsLayoutProps = {
  children: React.ReactNode
}

export function TabsLayout({ children }: TabsLayoutProps) {
  const theme = useAppTheme()

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          },
          headerTintColor: theme.colors.onSurface,
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: theme.colors.elevation.level2,
            borderTopWidth: 0,
            elevation: 0
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarLabelStyle: styles.tabBarLabel
        }}
      >
        {children}
      </Tabs>
      <RollResultsToast />
      <RollDetailsModal />
      <DiceDetailsModal />
      <NotationInputModal />
    </>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500'
  }
})
