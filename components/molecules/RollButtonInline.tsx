import { StyleSheet } from 'react-native'

import { Button, useAppTheme } from '@/components/atoms'
import { useDicePoolState, useLastRollState } from '@/store'

export function RollButtonInline() {
  const theme = useAppTheme()
  const dicePool = useDicePoolState.use.dicePool()
  const rollDice = useLastRollState.use.rollDice()
  const rollDiceArgs = useDicePoolState.use.rollDiceArgs()
  const disabled = dicePool.length === 0 || !rollDiceArgs

  return (
    <Button
      icon="dice-multiple"
      mode="contained"
      onPress={() => rollDice(rollDiceArgs)}
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
