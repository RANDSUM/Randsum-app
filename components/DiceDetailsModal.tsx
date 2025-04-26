import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { useStore } from '@/store'
import { HapticService } from '@/utils/haptics'
import { useMemoizedFindDie } from '@/utils/memoized'
import { validateNotation } from '@randsum/notation'
import { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'

export default function DiceDetailsModal() {
  const theme = useAppTheme()
  const dicePool = useStore.use.currentRoll().dicePool
  const visible = useStore.use.modals().showDiceDetails
  const selectedDieId = useStore.use.modals().selectedDieId
  const closeDiceDetails = useStore.use.closeDiceDetails()
  const addDie = useStore.use.addDie()
  const removeDie = useStore.use.removeDie()

  // Memoized die lookup to prevent unnecessary recalculations
  const die = useMemoizedFindDie(dicePool, selectedDieId)

  // Memoized values and callbacks
  const onDismiss = useCallback(() => {
    closeDiceDetails()
  }, [closeDiceDetails])

  const description = useMemo(() => {
    if (!die) return ''
    return die._type === 'notation'
      ? validateNotation(die.sides.notation).description
      : validateNotation(`${die.quantity}d${die.sides}`).description
  }, [die])

  const notation = useMemo(() => {
    if (!die) return ''
    return die._type === 'notation'
      ? die.sides.notation
      : `${die.quantity}D${die.sides}`
  }, [die])

  const handleIncreaseQuantity = useCallback(() => {
    if (!die) return
    if (die._type === 'numeric') {
      addDie(die.sides, 1)
    }
  }, [die, addDie])

  const handleDecreaseQuantity = useCallback(() => {
    if (!die) return
    HapticService.medium()
    removeDie(die.id)
  }, [die, removeDie])

  const handleRemoveAll = useCallback(() => {
    if (!die) return
    HapticService.medium()
    if (die._type === 'numeric') {
      for (let i = 0; i < die.quantity; i++) {
        removeDie(die.id)
      }
    } else {
      removeDie(die.id)
    }
    onDismiss()
  }, [die, removeDie, onDismiss])

  const showQuantityButtons = useMemo(() => die?._type === 'numeric', [die])

  if (!die) {
    return null
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.dialog, { backgroundColor: theme.colors.background }]}
      >
        <Dialog.Title style={styles.title}>Die Details</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Text variant="headlineMedium" style={styles.notation}>
            {notation}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </Dialog.Content>

        {showQuantityButtons && (
          <View style={styles.quantityContainer}>
            <Button
              mode="outlined"
              onPress={handleDecreaseQuantity}
              style={styles.quantityButton}
              icon="minus"
              disabled={die.quantity <= 1}
            >
              Decrease
            </Button>
            <Button
              mode="outlined"
              onPress={handleIncreaseQuantity}
              style={styles.quantityButton}
              icon="plus"
            >
              Increase
            </Button>
          </View>
        )}

        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
            onPress={handleRemoveAll}
            style={styles.removeButton}
            icon="delete-sweep"
          >
            Remove All
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
  notation: {
    textAlign: 'center',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8
  },
  quantityButton: {
    flex: 1
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  removeButton: {
    marginRight: 8
  }
})
