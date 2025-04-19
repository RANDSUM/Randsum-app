import DiceButtons from '@/components/DiceButtons'
import DicePool from '@/components/DicePool'
import RollButton from '@/components/RollButton'
import RollResultsModal from '@/components/RollResultsModal'
import { View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { ScrollView, StyleSheet } from 'react-native'

export default function Index() {
  const {
    dicePool,
    rollResult,
    modalVisible,
    addDie,
    removeDie,
    clearPool,
    rollDice,
    setModalVisible,
    groupDiceByType,
    getDiceNotation,
    groupRollResults
  } = useCurrentRoll()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContent}>
          <View style={styles.sidebarContainer}>
            <DiceButtons addDie={addDie} />
          </View>

          <View style={styles.contentContainer}>
            <DicePool
              dicePool={dicePool}
              removeDie={removeDie}
              clearPool={clearPool}
              groupDiceByType={groupDiceByType}
            />
          </View>
        </View>
      </ScrollView>

      <RollButton onPress={rollDice} disabled={dicePool.length === 0} />

      <RollResultsModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        rollResult={rollResult}
        dicePool={dicePool}
        getDiceNotation={getDiceNotation}
        groupRollResults={groupRollResults}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100
  },
  scrollContainer: {
    flex: 1,
    padding: 16
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1
  },
  sidebarContainer: {
    width: 120,
    marginRight: 16
  },
  contentContainer: {
    flex: 1
  }
})
