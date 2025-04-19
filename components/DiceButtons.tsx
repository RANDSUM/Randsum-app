import { FAB, Portal, useAppTheme } from '@/components/Themed'
import { DieLabel } from '@/types/dice'
import { StyleSheet, View } from 'react-native'

type DiceButtonsProps = {
  addDie: (label: DieLabel) => void
  clearPool: () => void
  poolEmpty: boolean
}

export default function DiceButtons({
  clearPool,
  addDie,
  poolEmpty
}: DiceButtonsProps) {
  const theme = useAppTheme()

  return (
    <Portal>
      <View style={styles.fabContainer}>
        {/* D4 FAB */}
        <FAB
          icon="dice-d4"
          label="D4"
          onPress={() => addDie('D4')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* D6 FAB */}
        <FAB
          icon="dice-d6"
          label="D6"
          onPress={() => addDie('D6')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* D8 FAB */}
        <FAB
          icon="dice-d8"
          label="D8"
          onPress={() => addDie('D8')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* D10 FAB */}
        <FAB
          icon="dice-d10"
          label="D10"
          onPress={() => addDie('D10')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* D12 FAB */}
        <FAB
          icon="dice-d12"
          label="D12"
          onPress={() => addDie('D12')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* D20 FAB */}
        <FAB
          icon="dice-d20"
          label="D20"
          onPress={() => addDie('D20')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* D100 FAB */}
        <FAB
          icon="circle"
          label="D100"
          onPress={() => addDie('D100')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        {/* Clear FAB */}
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
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    alignItems: 'flex-end',
    gap: 8,
    zIndex: 1
  },
  diceFab: {
    marginVertical: 4,
    paddingHorizontal: 8,
    width: 120
  },
  clearFab: {
    marginVertical: 4,
    paddingHorizontal: 8,
    marginTop: 16,
    width: 120
  }
})
