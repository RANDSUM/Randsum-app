import { StyleSheet } from 'react-native'

import { Button, useAppTheme } from '@/components/atoms'
import { useCurrentRollState } from '@/store'

export function RollButtonInline() {
  const theme = useAppTheme()
  const dicePool = useCurrentRollState.use.dicePool()
  const rollDice = useCurrentRollState.use.rollDice()
  const disabled = dicePool.length === 0

  return (
    <Button
      icon="dice-multiple"
      mode="contained"
      onPress={rollDice}
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
