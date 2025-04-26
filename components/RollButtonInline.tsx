import { Button, useAppTheme } from '@/components/Themed'
import { useAppContext } from '@/contexts/AppContext'
import { MetaActions } from '@/contexts/metaActions'
import { StyleSheet } from 'react-native'

export default function RollButtonInline() {
  const theme = useAppTheme()
  const { state, dispatch } = useAppContext()
  const {
    currentRoll: { dicePool }
  } = state
  const disabled = dicePool.length === 0

  return (
    <Button
      icon="dice-multiple"
      mode="contained"
      onPress={() => MetaActions.rollDice({ state, dispatch })}
      disabled={disabled}
      buttonColor={theme.colors.primary}
      textColor={theme.colors.onPrimary}
      style={[styles.rollButton, { opacity: disabled ? 0.5 : 1 }]}
    >
      Roll
    </Button>
  )
}

const styles = StyleSheet.create({
  rollButton: {
    elevation: 2
  }
})
