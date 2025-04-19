import { Button, useAppTheme } from '@/components/Themed'
import { StyleSheet, View } from 'react-native'

type RollButtonProps = {
  onPress: () => void
  disabled: boolean
  clearPool: () => void
  poolEmpty: boolean
}

export default function RollButton({
  onPress,
  disabled,
  clearPool,
  poolEmpty
}: RollButtonProps) {
  const theme = useAppTheme()

  return (
    <View style={styles.buttonContainer}>
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

      <Button
        icon="delete-sweep"
        mode="contained"
        onPress={clearPool}
        disabled={poolEmpty}
        buttonColor={
          poolEmpty ? theme.colors.surfaceDisabled : theme.colors.tertiary
        }
        textColor={theme.colors.onTertiary}
        style={[styles.clearButton, { opacity: poolEmpty ? 0.5 : 1 }]}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Clear
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    gap: 16
  },
  rollButton: {
    minWidth: 160,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearButton: {
    minWidth: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 8
  },
  buttonLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 4
  }
})
