import {
  Button,
  Modal,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { DieLabel, PoolDie, sidesToLabel } from '@/types/dice'
import { NumericRollResult } from '@randsum/dice'
import { ScrollView, StyleSheet } from 'react-native'

type RollResultsModalProps = {
  visible: boolean
  onDismiss: () => void
  rollResult: NumericRollResult | null
  dicePool: PoolDie[]
  getDiceNotation: (dice: DieLabel[]) => string
  groupRollResults: (result: NumericRollResult) => Record<string, number[]>
}

export default function RollResultsModal({
  visible,
  onDismiss,
  rollResult,
  dicePool,
  getDiceNotation,
  groupRollResults
}: RollResultsModalProps) {
  const theme = useAppTheme()

  if (!rollResult) return null

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
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
                {getDiceNotation(
                  dicePool.map((die) => sidesToLabel[die.sides])
                )}
              </Text>

              {/* Group results by die type */}
              {Object.entries(groupRollResults(rollResult)).map(
                ([dieType, values]) => (
                  <View key={dieType} style={styles.modalResultItem}>
                    <View style={styles.modalResultRow}>
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
                      <View style={styles.rowTotalContainer}>
                        <Text style={styles.rowTotalEquals}>=</Text>
                        <Text style={styles.rowTotal}>
                          {values.reduce((sum, val) => sum + val, 0)}
                        </Text>
                      </View>
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
            onPress={onDismiss}
            style={styles.modalCloseButton}
          >
            Close
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
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
    width: 80,
    textAlign: 'right',
    marginRight: 8
  },
  modalResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalDieResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  rowTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  rowTotalEquals: {
    marginRight: 4,
    opacity: 0.7
  },
  rowTotal: {
    fontWeight: 'bold',
    fontSize: 16
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
