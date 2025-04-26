import DiceButtons from '@/components/DiceButtons'
import DicePool from '@/components/DicePool'
import { View, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function Index() {
  const theme = useAppTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DicePool />
      <DiceButtons />
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
