import {
  Button,
  IconButton,
  Modal,
  Portal,
  Surface,
  Text,
  useAppTheme,
  View
} from '@/components/Themed'
import {
  D10,
  D100,
  D12,
  D20,
  D4,
  D6,
  D8,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

// Define types for our dice pool
type DieType = 'D4' | 'D6' | 'D8' | 'D10' | 'D12' | 'D20' | 'D100'
type PoolDie = { id: string; type: DieType }

export default function Index() {
  const theme = useAppTheme()

  // State for dice pool, results, and modal visibility
  const [dicePool, setDicePool] = useState<PoolDie[]>([])
  const [rollResult, setRollResult] = useState<NumericRollResult | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Map die types to their corresponding dice objects
  const diceMap = {
    D4,
    D6,
    D8,
    D10,
    D12,
    D20,
    D100
  }

  // Add a die to the pool
  const addDie = (dieType: DieType) => {
    const newDie = {
      id: Math.random().toString(36).substring(2, 9),
      type: dieType
    }
    setDicePool([...dicePool, newDie])
  }

  // Remove a die from the pool
  const removeDie = (dieType: DieType) => {
    // Find the first die of this type
    const dieToRemove = dicePool.find((die) => die.type === dieType)
    if (dieToRemove) {
      // Remove just one die of this type
      setDicePool(
        dicePool.filter(
          (_, index) =>
            index !== dicePool.findIndex((d) => d.id === dieToRemove.id)
        )
      )
    }
  }

  // Clear the dice pool
  const clearPool = () => {
    setDicePool([])
  }

  // Roll the dice in the pool
  const rollDice = () => {
    if (dicePool.length === 0) return

    // Convert pool dice to randsum dice objects
    const diceToRoll = dicePool.map((die) => diceMap[die.type])

    // Roll the dice using randsum's roll function
    const result = roll(...diceToRoll) as NumericRollResult

    // Set the result and show the modal
    setRollResult(result)
    setModalVisible(true)
  }

  // Group dice by type for display
  const groupDiceByType = (dice: DieType[]) => {
    const grouped: Record<DieType, number> = {
      D4: 0,
      D6: 0,
      D8: 0,
      D10: 0,
      D12: 0,
      D20: 0,
      D100: 0
    }

    dice.forEach((die) => {
      grouped[die]++
    })

    return Object.entries(grouped)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({ type: type as DieType, count }))
  }

  // Generate dice notation string (e.g., "2D6+1D20")
  const getDiceNotation = (dice: DieType[]): string => {
    const grouped = groupDiceByType(dice)
    return grouped.map(({ type, count }) => `${count}${type}`).join('+')
  }

  // Group roll results by die type
  const groupRollResults = (result: NumericRollResult) => {
    // Get the dice types from the current dice pool
    const diceTypes = dicePool.map((die) => die.type)

    // Create a map of die type to values
    const groupedResults: Record<string, number[]> = {}

    // Initialize all die types with empty arrays
    diceTypes.forEach((dieType) => {
      if (!groupedResults[dieType]) {
        groupedResults[dieType] = []
      }
    })

    // Add all values to their respective die types
    Object.values(result.rawRolls).forEach((values, i) => {
      const dieType = diceTypes[i] || 'Unknown'
      if (!groupedResults[dieType]) {
        groupedResults[dieType] = []
      }
      groupedResults[dieType].push(...values)
    })

    return groupedResults
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Dice Roller
        </Text>
      </View>

      <Surface style={styles.diceContainer} elevation={3} mode="elevated">
        {dicePool.length > 0 ? (
          <View style={styles.poolContainer}>
            {groupDiceByType(dicePool.map((die) => die.type)).map(
              ({ type, count }) => (
                <View key={type} style={styles.poolDie}>
                  <Text style={styles.poolDieText}>
                    {count > 1 ? `${count}${type}` : type}
                  </Text>
                  <IconButton
                    icon="close"
                    size={16}
                    onPress={() => removeDie(type)}
                    style={styles.removeButton}
                  />
                </View>
              )
            )}
          </View>
        ) : (
          <Text variant="bodyLarge" style={styles.emptyPoolText}>
            Select dice to add to your pool
          </Text>
        )}

        <View style={styles.poolActions}>
          <Button
            mode="outlined"
            buttonColor="transparent"
            textColor={theme.colors.secondary}
            style={[styles.poolButton, { borderColor: theme.colors.secondary }]}
            onPress={clearPool}
            disabled={dicePool.length === 0}
          >
            Clear Pool
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            style={styles.poolButton}
            onPress={rollDice}
            disabled={dicePool.length === 0}
          >
            Roll Dice
          </Button>
        </View>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D4')}
        >
          D4
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D6')}
        >
          D6
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D8')}
        >
          D8
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D10')}
        >
          D10
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D12')}
        >
          D12
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D20')}
        >
          D20
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
          onPress={() => addDie('D100')}
        >
          D100
        </Button>
      </View>

      {/* Results Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {rollResult && (
            <View>
              <Text variant="headlineMedium" style={styles.modalTitle}>
                Roll Results
              </Text>

              <Text variant="displayLarge" style={styles.modalTotal}>
                {rollResult.total}
              </Text>

              <View style={styles.modalResultsContainer}>
                <ScrollView style={styles.modalScroll}>
                  <Text style={styles.modalNotation}>
                    {getDiceNotation(dicePool.map((die) => die.type))}
                  </Text>

                  {/* Group results by die type */}
                  {Object.entries(groupRollResults(rollResult)).map(
                    ([dieType, values]) => (
                      <View key={dieType} style={styles.modalResultItem}>
                        <Text style={styles.modalDieType}>
                          {values.length > 1
                            ? `${values.length}${dieType}`
                            : dieType}
                          :
                        </Text>
                        <View style={styles.modalDieResults}>
                          {values.map((value, i) => (
                            <View
                              key={i}
                              style={[
                                styles.modalDieValue,
                                value === 20 &&
                                  dieType === 'D20' &&
                                  styles.criticalHit,
                                value === 1 &&
                                  dieType === 'D20' &&
                                  styles.criticalMiss
                              ]}
                            >
                              <Text style={styles.modalDieValueText}>
                                {value}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )
                  )}
                </ScrollView>
              </View>

              <Button
                mode="contained"
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseButton}
              >
                Close
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
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
    minWidth: 80,
    justifyContent: 'space-between'
  },
  poolDieText: {
    marginRight: 4,
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
    justifyContent: 'space-between'
  },
  poolButton: {
    flex: 1,
    marginHorizontal: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24
  },
  diceButton: {
    margin: 8,
    minWidth: 80
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
  criticalHit: {
    backgroundColor: 'rgba(38, 166, 154, 0.3)',
    borderWidth: 1,
    borderColor: '#26A69A'
  },
  criticalMiss: {
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
    borderWidth: 1,
    borderColor: '#F44336'
  },
  modalCloseButton: {
    marginTop: 16
  }
})
