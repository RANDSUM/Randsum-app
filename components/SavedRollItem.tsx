import { Button, Card, Text, useAppTheme } from '@/components/Themed'
import { useStore } from '@/store'
import { SavedRoll } from '@/types/savedRolls'
import { StyleSheet } from 'react-native'

type SavedRollItemProps = {
  roll: SavedRoll
}

export default function SavedRollItem({ roll }: SavedRollItemProps) {
  const theme = useAppTheme()
  const rollDiceFromSaved = useStore.use.rollDiceFromSaved()
  const removeSavedRoll = useStore.use.removeSavedRoll()

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
    rollDiceFromSaved(roll.dicePool)
  }

  const handleDelete = async () => {
    removeSavedRoll(roll.id)
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          {roll.name}
        </Text>
        <Text variant="bodyMedium" style={styles.notation}>
          {getDiceNotation()}
        </Text>
        <Text variant="bodySmall" style={styles.date}>
          Saved on {formatDate(roll.createdAt)}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          icon="delete"
          mode="outlined"
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          Delete
        </Button>
        <Button
          icon="dice-multiple"
          mode="contained"
          onPress={handleRoll}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
        >
          Roll
        </Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2
  },
  title: {
    marginBottom: 4
  },
  notation: {
    marginBottom: 8
  },
  date: {
    opacity: 0.6
  },
  actions: {
    justifyContent: 'flex-end',
    paddingTop: 8
  },
  deleteButton: {
    marginRight: 8
  }
})
