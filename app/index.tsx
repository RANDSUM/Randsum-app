import DiceButtons from '@/components/DiceButtons'
import DicePool from '@/components/DicePool'
import { View } from '@/components/Themed'
import { ScrollView, StyleSheet } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          <View style={styles.dicePoolContainer}>
            <DicePool />
          </View>

          <View style={styles.buttonsContainer}>
            <DiceButtons />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    paddingBottom: 32
  },
  scrollContainer: {
    flex: 1,
    height: '100%',
    flexGrow: 1,
    padding: 16
  },
  mainContent: {
    flex: 1
  },
  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    flex: 1
  },
  dicePoolContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    minHeight: 200
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})
