import ClearDiceTile from '@/components/ClearDiceTile'
import DicePoolTile from '@/components/DicePoolTile'
import { Text, View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { DieLabel, PoolDie, sidesToLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

type DicePoolProps = {
  dicePool: PoolDie[]
  removeDie: (label: DieLabel) => void
  clearPool: () => void
  groupDiceByType: (dice: DieLabel[]) => { type: DieLabel; count: number }[]
}

export default function DicePool({
  dicePool,
  removeDie,
  clearPool,
  groupDiceByType
}: DicePoolProps) {
  const { recentlyAddedDie } = useCurrentRoll()
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
          <ClearDiceTile onPress={clearPool} />
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
    alignItems: 'flex-start',
    paddingTop: 0
  },
  poolContainer: {
    flexDirection: 'row',
    paddingTop: 0,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12
  },
  emptyPoolText: {
    textAlign: 'left',
    marginVertical: 16,
    opacity: 0.7,
    paddingLeft: 8
  },
  poolActions: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  poolButton: {
    minWidth: 120
  }
})
