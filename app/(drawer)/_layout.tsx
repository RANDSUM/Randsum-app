import { useAppTheme } from '@/components/atoms'
import { DrawerLayout as AppDrawerLayout } from '@/components/templates'
import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
  const theme = useAppTheme()

  return (
    <AppDrawerLayout>
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
    </AppDrawerLayout>
  )
}
