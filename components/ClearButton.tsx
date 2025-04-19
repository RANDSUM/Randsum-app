import { Button, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

type ClearButtonProps = {
  onPress: () => void
  disabled: boolean
}

export default function ClearButton({ onPress, disabled }: ClearButtonProps) {
  const theme = useAppTheme()

  return (
    <Button
      icon="delete-sweep"
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      buttonColor={
        disabled ? theme.colors.surfaceDisabled : theme.colors.tertiary
      }
      textColor={theme.colors.onTertiary}
      style={[styles.clearButton, { opacity: disabled ? 0.5 : 1 }]}
    >
      Clear
    </Button>
  )
}

const styles = StyleSheet.create({
  clearButton: {
    width: 100,
    margin: 4,
    marginTop: 16
  }
})
