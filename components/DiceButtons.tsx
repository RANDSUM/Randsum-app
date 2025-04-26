import DiceButton from '@/components/DiceButton'
import SaveButton from '@/components/SaveButton'
import { Button, View, useAppTheme } from '@/components/Themed'
import { Actions } from '@/contexts/actions'
import { useAppContext } from '@/contexts/AppContext'
import { MetaActions } from '@/contexts/metaActions'
import { StyleSheet } from 'react-native'
import ClearButton from './ClearButton'
import RollButtonInline from './RollButtonInline'

export default function DiceButtons() {
  const { dispatch, state } = useAppContext()

  const theme = useAppTheme()

  const firstRowDice = [4, 6, 8]
  const secondRowDice = [10, 12, 20]

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonRow}>
        {firstRowDice.map((sides) => (
          <DiceButton
            key={'D' + sides}
            sides={sides}
            onPress={(sides, quantity) =>
              MetaActions.addDie({ dispatch, state }, sides, quantity)
            }
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        {secondRowDice.map((sides) => (
          <DiceButton
            key={'D' + sides}
            sides={sides}
            onPress={(sides, quantity) =>
              MetaActions.addDie({ dispatch, state }, sides, quantity)
            }
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <SaveButton />
        <Button
          icon="text-box-outline"
          mode="contained"
          onPress={() => dispatch(Actions.openNotationInput())}
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
