import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { useModal } from '@/contexts/ModalContext'
import { triggerDiceAdd, triggerDiceRemove } from '@/utils/haptics'
import { validateNotation } from '@randsum/notation'
import { StyleSheet } from 'react-native'

type DiceDetailsModalProps = {
  visible: boolean
  onDismiss: () => void
  dieId: string | null
}

export default function DiceDetailsModal({
  visible,
  onDismiss,
  dieId
}: DiceDetailsModalProps) {
  const theme = useAppTheme()
  const { dicePool, addDie, removeDie } = useCurrentRoll()
  const { closeDiceDetails } = useModal()

  if (!dieId) {
    return null
  }

  const die = dicePool.find((die) => die.id === dieId)
  if (!die) {
    return null
  }

  const description =
    die._type === 'notation'
      ? validateNotation(die.sides.notation).description
      : validateNotation(`${die.quantity}d${die.sides}`).description

  const notation =
    die._type === 'notation'
      ? die.sides.notation
      : `${die.quantity}D${die.sides}`

  const handleIncreaseQuantity = () => {
    if (die._type === 'numeric') {
      triggerDiceAdd()
      addDie(die.sides, 1)
    }
  }

  const handleDecreaseQuantity = () => {
    triggerDiceRemove()
    removeDie(die.id)
  }

  const handleRemoveAll = () => {
    triggerDiceRemove()
    if (die._type === 'numeric') {
      // Remove all dice of this type by calling removeDie multiple times
      for (let i = 0; i < die.quantity; i++) {
        removeDie(die.id)
      }
    } else {
      // For notation dice, just remove it once
      removeDie(die.id)
    }
    closeDiceDetails()
  }

  // Determine if we should show quantity buttons
  const showQuantityButtons = die._type === 'numeric'

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
