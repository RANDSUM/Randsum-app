import { useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/atoms'
import { useDicePoolState, useLastRollState } from '@/store'
import {
  useMemoizedDiceNotation,
  useMemoizedRollResults
} from '@/utils/memoized'

export function RollDetailsModal() {
  const theme = useAppTheme()
  const rollResult = useLastRollState.use.rollResult()
  const dicePool = useDicePoolState.use.dicePool()
  const rollSource = useLastRollState.use.rollSource()
  const visible = useLastRollState.use.showRollDetails()
  const closeRollDetails = useLastRollState.use.closeRollDetails()

  const commonDiceNotation = useMemoizedDiceNotation(dicePool)
  const rollGroups = useMemoizedRollResults(rollResult)

  const onDismiss = useCallback(() => {
    closeRollDetails()
  }, [closeRollDetails])

  const rollTitle = useMemo(() => {
    if (rollSource?.type === 'saved' && rollSource?.name) {
      return rollSource.name
    }
    return 'Roll Details'
  }, [rollSource])

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
        <Dialog.Title style={styles.title}>{rollTitle}</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Text style={styles.notation}>{commonDiceNotation}</Text>
          <ScrollView style={styles.scrollView}>
            {rollGroups.map((group, index) => (
              <View key={index} style={styles.resultGroup}>
                <Text style={styles.groupTitle}>{group.label}</Text>
                <View style={styles.resultRow}>
                  {group.results.map((result, resultIndex) => (
                    <View
                      key={resultIndex}
                      style={[
                        styles.resultCell,
                        {
                          backgroundColor: theme.colors.elevation.level2
                        }
                      ]}
                    >
                      <Text style={styles.resultText}>{result}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{rollResult.total}</Text>
            </View>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" onPress={onDismiss}>
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
  notation: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8
  },
  scrollView: {
    maxHeight: 400
  },
  resultGroup: {
    marginBottom: 16
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  resultRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8
  },
  resultCell: {
    padding: 8,
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center'
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)'
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})
