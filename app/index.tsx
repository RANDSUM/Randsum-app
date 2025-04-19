import ClearDiceButton from '@/components/ClearDiceButton'
import DiceButtons from '@/components/DiceButtons'
import DicePool from '@/components/DicePool'
import RollButton from '@/components/RollButton'
import { View } from '@/components/Themed'
import { ScrollView, StyleSheet } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainContent}>
          <View style={styles.contentContainer}>
            <DicePool />

            <DiceButtons />

            <ClearDiceButton />
          </View>
        </View>
      </ScrollView>
      <RollButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    paddingBottom: 100
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 16
  },
  mainContent: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%'
  }
})
