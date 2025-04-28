import { validateNotation } from '@randsum/notation'
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
import { useMemoizedFindDie } from '@/utils/memoized'

export function DiceDetailsModal() {
  const theme = useAppTheme()
  const dicePool = Store.use.currentRoll().dicePool
  const visible = Store.use.modals().showDiceDetails
  const selectedDieId = Store.use.modals().selectedDieId
  const closeDiceDetails = Store.use.closeDiceDetails()
  const addDie = Store.use.addDie()
  const removeDie = Store.use.removeDie()
  const decrementDieQuantity = Store.use.decrementDieQuantity()

  const die = useMemoizedFindDie(dicePool, selectedDieId)

  const onDismiss = useCallback(() => {
    closeDiceDetails()
  }, [closeDiceDetails])

  const handleRemoveDie = useCallback(() => {
    if (die) {
      removeDie(die.id)
      onDismiss()
    }
  }, [die, removeDie, onDismiss])

  const handleIncreaseQuantity = useCallback(() => {
    if (die && die.type === 'standard') {
      HapticService.light()
      addDie(die.sides)
    }
  }, [die, addDie])

  const handleDecreaseQuantity = useCallback(() => {
    if (die && die.type === 'standard' && die.quantity > 1) {
      HapticService.light()
      decrementDieQuantity(die.id)
    }
  }, [die, decrementDieQuantity])

  const notation = useMemo(() => {
    if (!die) return ''
    return die.type === 'notation'
      ? die.notation
      : `${die.quantity}D${die.sides}`
  }, [die])

  const description = useMemo(() => {
    if (!die) return ''

    if (die.type === 'notation') {
      const validationResult = validateNotation(die.notation)
      if (validationResult.valid && validationResult.description.length > 0) {
        return validationResult.description.join('\n')
      }
      return `Custom notation: ${die.notation}`
    }

    return `${die.quantity} ${die.quantity === 1 ? 'die' : 'dice'} with ${
      die.sides
    } ${die.sides === 1 ? 'side' : 'sides'}`
  }, [die])

  const showQuantityButtons = useMemo(() => {
    return die && die.type === 'standard'
  }, [die])

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
            onPress={handleRemoveDie}
            textColor={theme.colors.error}
            style={styles.removeButton}
          >
            Remove
          </Button>
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
    padding: 8
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  content: {
    alignItems: 'center',
    paddingVertical: 8
  },
  notation: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    opacity: 0.8
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16
  },
  quantityButton: {
    flex: 1,
    marginHorizontal: 4
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  removeButton: {
    borderColor: 'rgba(255, 0, 0, 0.3)'
  }
})
