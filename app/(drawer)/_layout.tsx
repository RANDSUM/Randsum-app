import DiceDetailsModal from '@/components/DiceDetailsModal'
import NotationInputModal from '@/components/NotationInputModal'
import RollDetailsModal from '@/components/RollDetailsModal'
import RollResultsToast from '@/components/RollResultsToast'
import { useAppTheme } from '@/components/Themed'
import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
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
        <Drawer.Screen
          name="index"
          options={{
            title: 'RANDSUM Dice Roller',
            drawerLabel: 'Dice Roller',
            headerStyle: {
              backgroundColor: theme.colors.elevation.level4
            },
            drawerContentStyle: {
              backgroundColor: theme.colors.background
            }
          }}
        />
        <Drawer.Screen
          name="saved-rolls"
          options={{
            title: 'Saved Rolls',
            drawerLabel: 'Saved Rolls',
            headerStyle: {
              backgroundColor: theme.colors.elevation.level4
            },
            drawerContentStyle: {
              backgroundColor: theme.colors.background
            }
          }}
        />
        <Drawer.Screen
          name="validate"
          options={{
            title: 'Validate Dice Notation',
            drawerLabel: 'Validate Dice Notation',
            headerStyle: {
              backgroundColor: theme.colors.elevation.level4
            },
            drawerContentStyle: {
              backgroundColor: theme.colors.background
            }
          }}
        />
      </Drawer>
      <RollResultsToast />
      <RollDetailsModal />
      <DiceDetailsModal />
      <NotationInputModal />
    </>
  )
}
