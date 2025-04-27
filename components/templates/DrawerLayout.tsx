import { useAppTheme } from '@/components/atoms'
import {
  DiceDetailsModal,
  NotationInputModal,
  RollDetailsModal,
  RollResultsToast
} from '@/components/organisms'
import { Drawer } from 'expo-router/drawer'

type DrawerLayoutProps = {
  children: React.ReactNode
}

export function DrawerLayout({ children }: DrawerLayoutProps) {
  const theme = useAppTheme()
  
  return (
    <>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          },
          headerTintColor: theme.colors.onSurface,
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: theme.colors.background
          },
          drawerContentStyle: {
            backgroundColor: theme.colors.background
          },
          drawerContentContainerStyle: {
            backgroundColor: theme.colors.background
          },
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: theme.colors.onSurface
        }}
      >
        {children}
      </Drawer>
      <RollResultsToast />
      <RollDetailsModal />
      <DiceDetailsModal />
      <NotationInputModal />
    </>
  )
}
