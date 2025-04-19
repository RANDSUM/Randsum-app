import DiceButton from '@/components/DiceButton'
import { View } from '@/components/Themed'
import { DieLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

type DiceButtonsProps = {
  addDie: (label: DieLabel) => void
}

export default function DiceButtons({ addDie }: DiceButtonsProps) {
  const diceTypes: DieLabel[] = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100']

  return (
    <View style={styles.buttonContainer}>
      {diceTypes.map((dieType) => (
        <DiceButton key={dieType} dieType={dieType} onPress={addDie} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 8
  }
})
