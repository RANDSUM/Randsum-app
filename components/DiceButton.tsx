import { Button, useAppTheme } from '@/components/Themed'
import { DieLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

type DiceButtonProps = {
  dieType: DieLabel
  onPress: (dieType: DieLabel) => void
}

export default function DiceButton({ dieType, onPress }: DiceButtonProps) {
  const theme = useAppTheme()

  // Determine the icon based on die type
  const getIcon = () => {
    if (dieType === 'D100') return 'circle'
    return `dice-${dieType.toLowerCase()}`
  }

  return (
    <Button
      icon={getIcon()}
      mode="contained"
      onPress={() => onPress(dieType)}
      buttonColor={theme.colors.secondary}
      textColor={theme.colors.onSecondary}
      style={styles.diceButton}
    >
      {dieType}
    </Button>
  )
}

const styles = StyleSheet.create({
  diceButton: {
    margin: 4,
    width: 100
  }
})
