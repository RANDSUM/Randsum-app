import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Button, Dialog, Portal, Text, useAppTheme } from '@/components/atoms'
import { useLastRollState } from '@/store'

export function ClearButton() {
  const theme = useAppTheme()
  const dicePool = useLastRollState.use.dicePool()
  const clearDicePool = useLastRollState.use.clearDicePool()
  const [confirmVisible, setConfirmVisible] = useState(false)
  const disabled = dicePool.length === 0

  const showConfirmation = () => {
    setConfirmVisible(true)
  }

  const hideConfirmation = () => {
    setConfirmVisible(false)
  }

  const handleConfirm = () => {
    clearDicePool()
    hideConfirmation()
  }

  return (
    <>
      <Button
        icon="delete"
        mode="contained"
        disabled={disabled}
        onPress={showConfirmation}
        buttonColor={theme.colors.errorContainer}
        textColor={theme.colors.onErrorContainer}
        style={[styles.clearButton, { opacity: disabled ? 0.5 : 1 }]}
      >
        Clear
      </Button>

      <Portal>
        <Dialog
          visible={confirmVisible}
          onDismiss={hideConfirmation}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title>Clear Dice Pool?</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to clear all dice from the pool?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>Cancel</Button>
            <Button onPress={handleConfirm} textColor={theme.colors.error}>
              Clear
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  clearButton: {
    margin: 4,
    width: 110,
    height: 40
  }
})
