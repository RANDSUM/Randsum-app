import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router/tabs'

import { useAppTheme } from '@/components/atoms'
import { TabsLayout } from '@/components/templates'

export default function TabsLayoutRoute() {
  const theme = useAppTheme()

  return (
    <TabsLayout>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dice Roller',
          tabBarLabel: 'Roller',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dice-multiple"
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          }
        }}
      />
      <Tabs.Screen
        name="saved-rolls"
        options={{
          title: 'Saved Rolls',
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="content-save"
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          }
        }}
      />
      <Tabs.Screen
        name="validate"
        options={{
          title: 'Validate Dice Notation',
          tabBarLabel: 'Validate',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="check-circle"
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          }
        }}
      />
    </TabsLayout>
  )
}
