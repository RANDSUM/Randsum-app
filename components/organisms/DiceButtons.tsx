import { StyleSheet } from 'react-native'

import { Button, View, useAppTheme } from '@/components/atoms'
import {
  ClearButton,
  DiceButton,
  RollButton,
  SaveButton
} from '@/components/molecules'
import { Store } from '@/store'

export function DiceButtons() {
  const addDie = Store.use.addDie()
  const openNotationInput = Store.use.openNotationInput()
  const theme = useAppTheme()

  const firstRowDice = [4, 6, 8]
  const secondRowDice = [10, 12, 20]

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonRow}>
        {firstRowDice.map((sides) => (
          <DiceButton key={'D' + sides} sides={sides} onPress={addDie} />
        ))}
      </View>

      <View style={styles.buttonRow}>
        {secondRowDice.map((sides) => (
          <DiceButton key={'D' + sides} sides={sides} onPress={addDie} />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <SaveButton />
        <Button
          icon="text-box-outline"
          mode="contained"
          onPress={openNotationInput}
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
        >
          Notation
        </Button>
        <ClearButton />
      </View>

      <View style={styles.rollButtonContainer}>
        <RollButton />
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
