import { Button, Dialog, Portal, Text, useAppTheme } from '@/components/Themed'
import { AppStore } from '@/store'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

export default function ClearButton() {
  const theme = useAppTheme()
  const dicePool = AppStore.use.currentRoll().dicePool
  const clearDicePool = AppStore.use.clearDicePool()
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
        icon="delete-sweep"
        mode="contained"
        onPress={showConfirmation}
        disabled={disabled}
        buttonColor={theme.colors.error}
        textColor={theme.colors.onError}
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
