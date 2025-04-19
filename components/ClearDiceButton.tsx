import { Dialog, FAB, Portal, Text, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

export default function ClearDiceButton() {
  const theme = useAppTheme()
  const { clearPool, dicePool } = useCurrentRoll()
  const [confirmVisible, setConfirmVisible] = useState(false)
  const disabled = dicePool.length === 0

  const showConfirmation = () => {
    setConfirmVisible(true)
  }

  const hideConfirmation = () => {
    setConfirmVisible(false)
  }

  const handleConfirm = () => {
    clearPool()
    hideConfirmation()
  }

  return (
    <>
      <FAB
        icon="delete-sweep"
        onPress={showConfirmation}
        disabled={disabled}
        color={theme.colors.onError}
        style={[
          styles.clearButton,
          { opacity: disabled ? 0.5 : 1, backgroundColor: theme.colors.error }
        ]}
        label="Clear"
      />

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
            <FAB
              size="small"
              onPress={hideConfirmation}
              label="Cancel"
              style={styles.dialogButton}
            />
            <FAB
              size="small"
              onPress={handleConfirm}
              color={theme.colors.onError}
              style={[
                styles.dialogButton,
                { backgroundColor: theme.colors.error }
              ]}
              label="Clear"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  clearButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    elevation: 4,
    zIndex: 5
  },
  dialogButton: {
    marginHorizontal: 8,
    marginBottom: 8
  }
})
