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
      <View style={styles.poolContent}>
        {dicePool.length > 0 ? (
          <View style={styles.poolContainer}>
            {groupDiceByType(
              dicePool.map((die) => sidesToLabel[die.sides])
            ).map(({ type, count }) => (
              <DicePoolTile
                key={type}
                type={type}
                count={count}
                onRemove={removeDie}
                shouldShake={type === recentlyAddedDie}
              />
            ))}
          </View>
        ) : (
          <Text variant="bodyLarge" style={styles.emptyPoolText}>
            Select dice to add to your pool
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  diceContainer: {
    marginVertical: 24,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    width: '100%',
    flex: 1,
    display: 'flex'
  },
  poolContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  poolContainer: {
    flexDirection: 'row',
    paddingTop: 0,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    maxWidth: 528
  },
  emptyPoolText: {
    textAlign: 'center',
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
