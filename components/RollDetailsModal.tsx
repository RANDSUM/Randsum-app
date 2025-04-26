import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { ScrollView, StyleSheet } from 'react-native'

type RollDetailsModalProps = {
  visible: boolean
  onDismiss: () => void
}

export default function RollDetailsModal({
  visible,
  onDismiss
}: RollDetailsModalProps) {
  const theme = useAppTheme()
  const { rollResult, commonDiceNotation, groupRollResults } = useCurrentRoll()

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
            <Text style={styles.modalNotation}>{commonDiceNotation}</Text>
            {groupRollResults(rollResult).map((group, groupIndex) => (
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
