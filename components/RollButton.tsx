import { Button, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

type RollButtonProps = {
  onPress: () => void
  disabled: boolean
}

export default function RollButton({ onPress, disabled }: RollButtonProps) {
  const theme = useAppTheme()

  return (
    <Button
      icon="dice-multiple"
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      buttonColor={theme.colors.primary}
      textColor={theme.colors.onPrimary}
      style={styles.rollButton}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
    >
      Roll
    </Button>
  )
}

const styles = StyleSheet.create({
  rollButton: {
    width: 240,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 4,
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
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
