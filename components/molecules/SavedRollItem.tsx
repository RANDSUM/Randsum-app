import { Button, Card, Dialog, Portal, Text, View, useAppTheme } from '@/components/atoms'
import { Store } from '@/store'
import { SavedRoll } from '@/types/savedRolls'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

type SavedRollItemProps = {
  roll: SavedRoll
}

export function SavedRollItem({ roll }: SavedRollItemProps) {
  const theme = useAppTheme()
  const rollDiceFromSaved = Store.use.rollDiceFromSaved()
  const removeSavedRoll = Store.use.removeSavedRoll()
  const [confirmVisible, setConfirmVisible] = useState(false)

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  const getDiceNotation = () => {
    return roll.dicePool
      .map((die) =>
        die._type === 'notation'
          ? die.sides.notation
          : `${die.quantity}D${die.sides}`
      )
      .join(' + ')
  }

  const handleRoll = () => {
    // Roll the saved dice without modifying the current dice pool
    rollDiceFromSaved(roll.dicePool, roll.name)
  }

  const showConfirmation = () => {
    setConfirmVisible(true)
  }

  const hideConfirmation = () => {
    setConfirmVisible(false)
  }

  const handleConfirmDelete = () => {
    removeSavedRoll(roll.id)
    hideConfirmation()
  }

  return (
    <>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.title}>
            {roll.name}
          </Text>
          <Text variant="bodyMedium" style={styles.notation}>
            {getDiceNotation()}
          </Text>
          <View style={styles.actionsContainer}>
            <Button
              icon="delete"
              mode="outlined"
              onPress={showConfirmation}
              style={styles.deleteButton}
              compact
            >
              Delete
            </Button>
            <Button
              icon="dice-multiple"
              mode="contained"
              onPress={handleRoll}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              compact
            >
              Roll
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog
          visible={confirmVisible}
          onDismiss={hideConfirmation}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title>Delete Saved Roll?</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete "{roll.name}"? This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>Cancel</Button>
            <Button onPress={handleConfirmDelete} textColor={theme.colors.error}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.95)'
  },
  notation: {
    flex: 2,
    textAlign: 'left',
    marginHorizontal: 8
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8
  },
  deleteButton: {
    marginRight: 0
  }
})
