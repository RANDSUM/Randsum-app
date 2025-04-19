import ClearButton from '@/components/ClearButton'
import DiceButton from '@/components/DiceButton'
import RollButtonInline from '@/components/RollButtonInline'
import SaveButton from '@/components/SaveButton'
import { View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { DieLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

export default function DiceButtons() {
  const { addDie } = useCurrentRoll()

  // Reorganize dice types to include Save before D100
  const firstRowDice: DieLabel[] = ['D4', 'D6', 'D8']
  const secondRowDice: DieLabel[] = ['D10', 'D12', 'D20']
  const thirdRowDice: (DieLabel | 'Save' | 'Clear')[] = [
    'Save',
    'D100',
    'Clear'
  ]

  return (
    <View style={styles.buttonContainer}>
      {/* First row of dice */}
      <View style={styles.buttonRow}>
        {firstRowDice.map((dieType) => (
          <DiceButton key={dieType} dieType={dieType} onPress={addDie} />
        ))}
      </View>

      {/* Second row of dice */}
      <View style={styles.buttonRow}>
        {secondRowDice.map((dieType) => (
          <DiceButton key={dieType} dieType={dieType} onPress={addDie} />
        ))}
      </View>

      {/* Third row with Save, D100, and Clear */}
      <View style={styles.buttonRow}>
        <SaveButton />
        <DiceButton dieType="D100" onPress={addDie} />
        <ClearButton />
      </View>

      {/* Roll button (full width) */}
      <View style={styles.rollButtonContainer}>
        <RollButtonInline />
      </View>
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
    gap: 12
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  rollButtonContainer: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 4
  }
})
