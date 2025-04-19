import { Button, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { StyleSheet } from 'react-native'

export default function RollButtonInline() {
  const theme = useAppTheme()
  const { rollDice, dicePool } = useCurrentRoll()
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
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  }
})
