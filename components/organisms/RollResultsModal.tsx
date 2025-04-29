import { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'

import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/atoms'
import { Store } from '@/store'
import { HapticService } from '@/utils/haptics'
import { useMemoizedDiceNotation } from '@/utils/memoized'

export function RollResultsModal() {
  const theme = useAppTheme()
  const rollResult = Store.use.rollResult()
  const dicePool = Store.use.dicePool()
  const rollSource = Store.use.rollSource()
  const visible = Store.use.showRollResults()
  const closeRollResults = Store.use.closeRollResults()
  const openRollDetails = Store.use.openRollDetails()
  const rollDice = Store.use.rollDice()
  const rollDiceFromSaved = Store.use.rollDiceFromSaved()

  const commonDiceNotation = useMemoizedDiceNotation(dicePool)

  const onDismiss = useCallback(() => {
    closeRollResults()
  }, [closeRollResults])

  const handleShowDetails = useCallback(() => {
    onDismiss()
    openRollDetails()
  }, [onDismiss, openRollDetails])

  const handleRollAgain = useCallback(() => {
    HapticService.medium()
    closeRollResults()

    // Use the appropriate roll function based on the source
    if (rollSource.type === 'saved' && rollSource.name) {
      setTimeout(() => {
        rollDiceFromSaved(dicePool, rollSource.name)
      }, 100)
    } else {
      setTimeout(() => {
        rollDice()
      }, 100)
    }
  }, [closeRollResults, rollDice, rollDiceFromSaved, dicePool, rollSource])

  const modalTitle = useMemo(() => {
    if (rollSource.type === 'saved' && rollSource.name) {
      return rollSource.name
    }
    return 'Roll Results'
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
        <Dialog.Title style={styles.title}>{modalTitle}</Dialog.Title>
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
            style={styles.actionButton}
          >
            Show Details
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={handleRollAgain}
            style={styles.actionButton}
            icon="dice-multiple"
          >
            Roll Again
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
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
  },
  closeButton: {
    margin: 0
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 8
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4
  }
})
