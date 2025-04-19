import { IconButton, Text, View } from '@/components/Themed'
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
              <View key={type} style={styles.poolDie}>
                {type !== 'D100' ? (
                  <IconButton
                    icon={`dice-${type.toLowerCase()}`}
                    size={20}
                    style={styles.dieIcon}
                  />
                ) : null}
                <Text style={styles.poolDieText}>
                  {count > 1 ? `${count}${type}` : type}
                </Text>
                <IconButton
                  icon="close"
                  size={16}
                  onPress={() => removeDie(type)}
                  style={styles.removeButton}
                />
              </View>
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
    marginBottom: 24
  },
  poolContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16
  },
  poolDie: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    padding: 8,
    margin: 4,
    minWidth: 120,
    justifyContent: 'space-between'
  },
  poolDieText: {
    flex: 1,
    fontWeight: 'bold'
  },
  dieIcon: {
    margin: 0,
    padding: 0
  },
  removeButton: {
    margin: 0,
    padding: 0
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
