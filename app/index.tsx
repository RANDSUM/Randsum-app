import ClearButton from '@/components/ClearButton'
import DiceButtons from '@/components/DiceButtons'
import DicePool from '@/components/DicePool'
import RollFAB from '@/components/RollFAB'
import RollResultsModal from '@/components/RollResultsModal'
import { Text, View } from '@/components/Themed'
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
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Dice Roller
          </Text>
        </View>

        <DicePool
          dicePool={dicePool}
          removeDie={removeDie}
          groupDiceByType={groupDiceByType}
        />

        <DiceButtons addDie={addDie} />
      </ScrollView>

      <RollFAB onPress={rollDice} disabled={dicePool.length === 0} />

      <ClearButton clearPool={clearPool} poolEmpty={dicePool.length === 0} />

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
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    padding: 16
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16
  },
  diceContainer: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 4
  },
  poolContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16
  },
  poolDie: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    padding: 8,
    margin: 4,
    minWidth: 120,
    justifyContent: 'space-between'
  },
  poolDieText: {
    flex: 1,
    fontWeight: 'bold'
  },
  removeButton: {
    margin: 0,
    padding: 0
  },
  emptyPoolText: {
    textAlign: 'center',
    marginVertical: 16,
    opacity: 0.7
  },
  poolActions: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  poolButton: {
    minWidth: 120
  },

  modalContainer: {
    backgroundColor: '#2A2A2A',
    padding: 24,
    margin: 24,
    borderRadius: 8,
    maxHeight: '80%'
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold'
  },
  modalTotal: {
    textAlign: 'center',
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 16
  },
  modalNotation: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.8
  },
  modalResultsContainer: {
    marginBottom: 24,
    maxHeight: 300
  },
  modalScroll: {
    flex: 1
  },
  modalResultItem: {
    marginBottom: 16
  },
  modalDieType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  modalDieResults: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  modalDieValue: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4
  },
  modalDieValueText: {
    fontWeight: 'bold'
  },
  modalCloseButton: {
    marginTop: 16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  diceButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16
  },
  diceButton: {
    margin: 8,
    minWidth: 80
  },
  dieIcon: {
    margin: 0,
    padding: 0
  }
})
