import DicePoolTile from '@/components/DicePoolTile'
import { Text, View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { StyleSheet } from 'react-native'

export default function DicePool() {
  const { dicePool } = useCurrentRoll()

  return (
    <View style={styles.diceContainer}>
      <View style={styles.poolContent}>
        {dicePool.length > 0 ? (
          <View style={styles.poolContainer}>
            {dicePool.map((item) => {
              return <DicePoolTile key={item.id} die={item} />
            })}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    width: '100%',
    flex: 1,
    display: 'flex',
    height: '100%'
  },
  poolContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center'
  },
  poolContainer: {
    flexDirection: 'row',
    paddingTop: 0,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 12,
    maxWidth: 528,
    width: '100%'
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
