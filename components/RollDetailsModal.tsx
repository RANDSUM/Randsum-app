import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { Store } from '@/store'
import {
  useMemoizedDiceNotation,
  useMemoizedRollResults
} from '@/utils/memoized'
import { useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function RollDetailsModal() {
  const theme = useAppTheme()
  const currentRoll = Store.use.currentRoll()
  const rollResult = currentRoll.rollResult
  const dicePool = currentRoll.dicePool
  const rollSource = currentRoll.rollSource
  const visible = Store.use.modals().showRollDetails
  const closeRollDetails = Store.use.closeRollDetails()

  // Memoized values to prevent unnecessary recalculations
  const commonDiceNotation = useMemoizedDiceNotation(dicePool)
  const rollGroups = useMemoizedRollResults(rollResult)

  // Memoized function to extract modifiers from notation
  const extractModifier = useCallback((notation: string): number | null => {
    const modifierMatch = notation.match(/([+-]\d+)/)
    if (modifierMatch) {
      return parseInt(modifierMatch[1], 10)
    }
    return null
  }, [])

  // Memoized function to add modifiers to groups
  const groupsWithModifiers = useMemo(() => {
    if (!rollResult) return []

    return rollGroups.map((group) => {
      const modifier = extractModifier(group.label)
      return {
        ...group,
        modifier
      }
    })
  }, [rollResult, rollGroups, extractModifier])

  // Memoized callback for dismissing the modal
  const onDismiss = useCallback(() => {
    closeRollDetails()
  }, [closeRollDetails])

  if (!rollResult) {
    return null
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.dialog, { backgroundColor: theme.colors.background }]}
      >
        <Dialog.Title style={styles.title}>Roll Details</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <ScrollView style={styles.modalScroll}>
            {rollSource.type === 'saved' && rollSource.name && (
              <Text style={styles.savedRollName}>{rollSource.name}</Text>
            )}
            <Text style={styles.modalNotation}>{commonDiceNotation}</Text>
            {groupsWithModifiers.map((group, groupIndex) => (
              <View key={groupIndex} style={styles.modalResultItem}>
                <Text style={styles.modalDieType}>{group.label}:</Text>
                <View style={styles.diceResultsRow}>
                  <View style={styles.modalDieResults}>
                    {group.results.map((roll, index) => (
                      <View
                        key={`active-${index}`}
                        style={styles.modalDieValue}
                      >
                        <Text style={styles.modalDieValueText}>{roll}</Text>
                      </View>
                    ))}
                    {group.modifier !== null && (
                      <View
                        style={[styles.modalDieValue, styles.modifierValue]}
                      >
                        <Text
                          style={[
                            styles.modalDieValueText,
                            styles.modifierValueText
                          ]}
                        >
                          {group.modifier >= 0
                            ? `+${group.modifier}`
                            : group.modifier}
                        </Text>
                      </View>
                    )}
                    {group.rejectedRolls.map((roll, index) => (
                      <View
                        key={`rejected-${index}`}
                        style={[styles.modalDieValue, styles.droppedDie]}
                      >
                        <Text
                          style={[
                            styles.modalDieValueText,
                            styles.droppedDieText
                          ]}
                        >
                          {roll}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.rowTotalContainer}>
                    <Text style={styles.rowTotalEquals}>=</Text>
                    <Text style={styles.rowTotal}>{group.total}</Text>
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.finalTotalContainer}>
              <Text style={styles.finalTotalLabel}>Total</Text>
              <Text style={styles.finalTotal}>{rollResult.total}</Text>
            </View>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={onDismiss}
          >
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
    padding: 8,
    maxWidth: '95%',
    width: 500,
    maxHeight: '90%',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  content: {
    paddingVertical: 8,
    maxHeight: 500
  },
  modalScroll: {
    flex: 1
  },
  savedRollName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'rgba(255, 255, 255, 0.9)'
  },
  modalNotation: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.8
  },
  modalResultItem: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalDieType: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'right',
    marginRight: 8
  },
  diceResultsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalDieResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 8
  },
  modalDieValue: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalDieValueText: {
    fontWeight: 'bold'
  },
  modifierValue: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  modifierValueText: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  droppedDie: {
    opacity: 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed'
  },
  droppedDieText: {
    textDecorationLine: 'line-through',
    opacity: 0.6
  },
  rowTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8
  },
  rowTotalEquals: {
    marginRight: 4,
    opacity: 0.7
  },
  rowTotal: {
    fontWeight: 'bold',
    fontSize: 16
  },
  finalTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 16
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    opacity: 0.7
  },
  finalTotal: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})
