import DiceButtons from '@/components/DiceButtons'
import DicePool from '@/components/DicePool'
import { View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
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
