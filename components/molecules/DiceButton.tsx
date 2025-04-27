import { Button, useAppTheme } from '@/components/atoms'
import { HapticService } from '@/utils/haptics'
import { StyleSheet } from 'react-native'

type DiceButtonProps = {
  sides: number
  onPress: (sides: number, quantity?: number) => void
}

export function DiceButton({ sides, onPress }: DiceButtonProps) {
  const theme = useAppTheme()

  const getIcon = () => {
    if ([4, 6, 8, 10, 12, 20].includes(sides)) {
      return `dice-d${sides}`
    }

    return 'dice-multiple'
  }

  const handlePress = () => {
    HapticService.light()
    onPress(sides)
  }

  return (
    <Button
      icon={getIcon()}
      mode="contained"
      onPress={handlePress}
      buttonColor={theme.colors.secondary}
      textColor={theme.colors.onSecondary}
      style={styles.diceButton}
    >
      D{sides}
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
