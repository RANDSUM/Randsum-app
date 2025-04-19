import { FAB, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

type ClearButtonProps = {
  clearPool: () => void
  poolEmpty: boolean
}

export default function ClearButton({
  clearPool,
  poolEmpty
}: ClearButtonProps) {
  const theme = useAppTheme()

  return (
    <FAB
      icon="delete-sweep"
      label="Clear"
      onPress={clearPool}
      disabled={poolEmpty}
      style={[
        styles.clearFab,
        {
          backgroundColor: poolEmpty
            ? theme.colors.surfaceDisabled
            : theme.colors.tertiary,
          opacity: poolEmpty ? 0.5 : 1
        }
      ]}
      color={theme.colors.onTertiary}
      customSize={48}
    />
  )
}

const styles = StyleSheet.create({
  clearFab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    marginVertical: 4,
    paddingHorizontal: 8,
    width: 120,
    zIndex: 1
  }
})
