import { FAB, Portal, useAppTheme } from '@/components/Themed'
import { DieLabel } from '@/types/dice'
import { StyleSheet, View } from 'react-native'

type DiceButtonsProps = {
  addDie: (label: DieLabel) => void
}

export default function DiceButtons({ addDie }: DiceButtonsProps) {
  const theme = useAppTheme()

  return (
    <Portal>
      <View style={styles.fabContainer}>
        <FAB
          icon="dice-d4"
          label="D4"
          onPress={() => addDie('D4')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        <FAB
          icon="dice-d6"
          label="D6"
          onPress={() => addDie('D6')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        <FAB
          icon="dice-d8"
          label="D8"
          onPress={() => addDie('D8')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        <FAB
          icon="dice-d10"
          label="D10"
          onPress={() => addDie('D10')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        <FAB
          icon="dice-d12"
          label="D12"
          onPress={() => addDie('D12')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        <FAB
          icon="dice-d20"
          label="D20"
          onPress={() => addDie('D20')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />

        <FAB
          icon="circle"
          label="D100"
          onPress={() => addDie('D100')}
          style={[styles.diceFab, { backgroundColor: theme.colors.secondary }]}
          color={theme.colors.onSecondary}
          customSize={48}
        />
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    left: 16,
    bottom: 10,
    alignItems: 'flex-start',
    gap: 8,
    zIndex: 1
  },
  diceFab: {
    marginVertical: 4,
    paddingHorizontal: 8,
    width: 120
  }
})
