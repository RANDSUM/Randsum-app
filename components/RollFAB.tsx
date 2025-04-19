import { FAB, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

type RollFABProps = {
  onPress: () => void
  disabled: boolean
}

export default function RollFAB({ onPress, disabled }: RollFABProps) {
  const theme = useAppTheme()

  return (
    <FAB
      icon="dice-multiple"
      label="Roll"
      onPress={onPress}
      disabled={disabled}
      style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      color={theme.colors.onPrimary}
      customSize={56}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    width: 120,
    zIndex: 2
  }
})
