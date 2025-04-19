import DiceButton from '@/components/DiceButton'
import SaveButton from '@/components/SaveButton'
import { Button, View, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import ClearButton from './ClearButton'
import RollButtonInline from './RollButtonInline'

export default function DiceButtons() {
  const { addDie } = useCurrentRoll()
  const router = useRouter()
  const theme = useAppTheme()

  const firstRowDice: string[] = ['D4', 'D6', 'D8']
  const secondRowDice: string[] = ['D10', 'D12', 'D20']

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonRow}>
        {firstRowDice.map((dieType) => (
          <DiceButton key={dieType} dieType={dieType} onPress={addDie} />
        ))}
      </View>

      <View style={styles.buttonRow}>
        {secondRowDice.map((dieType) => (
          <DiceButton key={dieType} dieType={dieType} onPress={addDie} />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <SaveButton />
        <Button
          icon="text-box-outline"
          mode="contained"
          onPress={() => router.push('/notation-input')}
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
        >
          Notation
        </Button>
        <ClearButton />
      </View>

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
  diceButton: {
    margin: 4,
    width: 110,
    height: 40
  },
  rollButtonContainer: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 4
  }
})
