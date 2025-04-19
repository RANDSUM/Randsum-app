import DiceButton from '@/components/DiceButton'
import { View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { DieLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

export default function DiceButtons() {
  const { addDie } = useCurrentRoll()
  const diceTypes: DieLabel[] = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100']

  // Group dice types into rows of 3
  const rows = []
  for (let i = 0; i < diceTypes.length; i += 3) {
    rows.push(diceTypes.slice(i, i + 3))
  }

  return (
    <View style={styles.buttonContainer}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.buttonRow}>
          {row.map((dieType) => (
            <DiceButton key={dieType} dieType={dieType} onPress={addDie} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    gap: 8
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  }
})
