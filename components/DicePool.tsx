import DicePoolTile from '@/components/DicePoolTile'
import { Text, View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { sidesToLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

export default function DicePool() {
  const { dicePool, removeDie, groupDiceByType, recentlyAddedDie } =
    useCurrentRoll()
  return (
    <View style={styles.diceContainer}>
      {dicePool.length > 0 ? (
        <View style={styles.poolContainer}>
          {groupDiceByType(dicePool.map((die) => sidesToLabel[die.sides])).map(
            ({ type, count }) => (
              <DicePoolTile
                key={type}
                type={type}
                count={count}
                onRemove={removeDie}
                shouldShake={type === recentlyAddedDie}
              />
            )
          )}
        </View>
      ) : (
        <Text variant="bodyLarge" style={styles.emptyPoolText}>
          Select dice to add to your pool
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  diceContainer: {
    marginBottom: 24,
    minHeight: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    width: '100%'
  },
  poolContainer: {
    flexDirection: 'row',
    paddingTop: 0,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12
  },
  emptyPoolText: {
    textAlign: 'center',
    marginVertical: 16,
    opacity: 0.7
  },
  poolActions: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  poolButton: {
    minWidth: 120
  }
})
