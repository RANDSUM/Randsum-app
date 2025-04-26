import RollDetailsModal from '@/components/RollDetailsModal'
import RollResultsModal from '@/components/RollResultsModal'
import { useAppTheme } from '@/components/Themed'
import { useModal } from '@/contexts/AppContext'
import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
  const theme = useAppTheme()
  const {
    showRollResults,
    showRollDetails,
    closeRollResults,
    closeRollDetails
  } = useModal()

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
            title: 'Roller',
            drawerLabel: 'Roller',
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
          name="notation-input"
          options={{
            title: 'Custom Notation',
            drawerLabel: 'Custom Notation',
            headerStyle: {
              backgroundColor: theme.colors.elevation.level4
            },
            drawerContentStyle: {
              backgroundColor: theme.colors.background
            },
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="validate"
          options={{
            title: 'Validate Notation',
            drawerLabel: 'Validate Notation',
            headerStyle: {
              backgroundColor: theme.colors.elevation.level4
            },
            drawerContentStyle: {
              backgroundColor: theme.colors.background
            }
          }}
        />
      </Drawer>
      <RollResultsModal
        visible={showRollResults}
        onDismiss={closeRollResults}
      />

      <RollDetailsModal
        visible={showRollDetails}
        onDismiss={closeRollDetails}
      />
    </>
  )
}
