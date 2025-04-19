import DicePoolTile from '@/components/DicePoolTile'
import { Text, View } from '@/components/Themed'
import { DieLabel, PoolDie, sidesToLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

type DicePoolProps = {
  dicePool: PoolDie[]
  removeDie: (label: DieLabel) => void
  groupDiceByType: (dice: DieLabel[]) => { type: DieLabel; count: number }[]
}

export default function DicePool({
  dicePool,
  removeDie,
  groupDiceByType
}: DicePoolProps) {
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
    justifyContent: 'center'
  },
  poolContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
