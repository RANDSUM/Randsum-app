import { Button, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { StyleSheet } from 'react-native'

export default function RollButton() {
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
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
    >
      Roll
    </Button>
  )
}

const styles = StyleSheet.create({
  rollButton: {
    width: '90%',
    maxWidth: '90%',
    alignSelf: 'center',
    height: 60,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 4,
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    marginHorizontal: 'auto',
    zIndex: 10
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 16
  },
  buttonLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 24,
    fontSize: 18
  }
})
