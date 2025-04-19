import { Button, useAppTheme } from '@/components/Themed'
import { StandardDieLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

type DiceButtonProps = {
  dieType: StandardDieLabel
  onPress: (dieType: StandardDieLabel) => void
}

export default function DiceButton({ dieType, onPress }: DiceButtonProps) {
  const theme = useAppTheme()

  // Determine the icon based on die type
  const getIcon = () => {
    if (dieType === 'D100') return 'circle'

    // Extract the number from the die type (e.g., 'D20' -> '20')
    const match = dieType.match(/^D(\d+)$/)
    if (match) {
      const sides = match[1]
      // Only standard dice have icons
      if (['4', '6', '8', '10', '12', '20'].includes(sides)) {
        return `dice-d${sides}`
      }
    }

    // Default icon for non-standard dice
    return 'dice-multiple'
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
    width: 110,
    height: 40
  }
})
