import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/atoms'
import { Store } from '@/store'
import { useMemoizedDiceNotation } from '@/utils/memoized'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'

export function RollResultsModal() {
  const theme = useAppTheme()
  const rollResult = Store.use.currentRoll().rollResult
  const dicePool = Store.use.currentRoll().dicePool
  const visible = Store.use.modals().showRollResults
  const closeRollResults = Store.use.closeRollResults()
  const openRollDetails = Store.use.openRollDetails()

  // Memoized dice notation to prevent unnecessary recalculations
  const commonDiceNotation = useMemoizedDiceNotation(dicePool)

  // Memoized callbacks to prevent unnecessary re-renders
  const onDismiss = useCallback(() => {
    closeRollResults()
  }, [closeRollResults])

  const handleShowDetails = useCallback(() => {
    onDismiss()
    openRollDetails()
  }, [onDismiss, openRollDetails])

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
        <Dialog.Title style={styles.title}>Roll Results</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Text style={styles.modalNotation}>{commonDiceNotation}</Text>
          <View style={styles.centeredContent}>
            <Text variant="displayLarge" style={styles.modalTotal}>
              {rollResult.total}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleShowDetails}
            style={styles.detailsButton}
          >
            Show Details
          </Button>
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
    maxWidth: '90%',
    width: 400,
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  content: {
    paddingVertical: 16
  },
  modalNotation: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.8
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTotal: {
    textAlign: 'center',
    fontSize: 72,
    lineHeight: 80,
    fontWeight: 'bold'
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  detailsButton: {
    marginRight: 8
  }
})
