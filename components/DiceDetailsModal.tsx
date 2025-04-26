import { Button, Dialog, Portal, Text, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
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
  const { dicePool } = useCurrentRoll()

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
  }
})
