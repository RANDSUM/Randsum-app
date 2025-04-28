import { StyleSheet } from 'react-native'

import { View, useAppTheme } from '@/components/atoms'

type MainLayoutProps = {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const theme = useAppTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 24,
    flex: 1,
    justifyContent: 'center'
  }
})
