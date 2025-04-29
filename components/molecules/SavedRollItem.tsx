import { memo, useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'

import {
  Button,
  Card,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/atoms'
import { Store } from '@/store'
import { SavedRoll } from '@/types/savedRolls'

type SavedRollItemProps = {
  roll: SavedRoll
}

function SavedRollItemComponent({ roll }: SavedRollItemProps) {
  const theme = useAppTheme()
  const rollDiceFromSaved = Store.use.rollDiceFromSaved()
  const removeSavedRoll = Store.use.removeSavedRoll()
  const [confirmVisible, setConfirmVisible] = useState(false)

  const diceNotation = useMemo(() => {
    return roll.dicePool
      .map((die) =>
        die.type === 'notation' ? die.notation : `${die.quantity}D${die.sides}`
      )
      .join(' + ')
  }, [roll.dicePool])

  const handleRoll = useCallback(() => {
    rollDiceFromSaved(roll.dicePool, roll.name)
  }, [roll.dicePool, roll.name, rollDiceFromSaved])

  const showConfirmation = useCallback(() => {
    setConfirmVisible(true)
  }, [])

  const hideConfirmation = useCallback(() => {
    setConfirmVisible(false)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    removeSavedRoll(roll.id)
    hideConfirmation()
  }, [roll.id, removeSavedRoll, hideConfirmation])

  return (
    <>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.title}>
            {roll.name}
          </Text>
          <Text variant="bodyMedium" style={styles.notation}>
            {diceNotation}
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
              Are you sure you want to delete "{roll.name}"? This action cannot
              be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>Cancel</Button>
            <Button
              onPress={handleConfirmDelete}
              textColor={theme.colors.error}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

// Export a memoized version of the component
export const SavedRollItem = memo(SavedRollItemComponent)

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
