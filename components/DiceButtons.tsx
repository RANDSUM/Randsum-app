import { Button, Surface, useAppTheme } from '@/components/Themed'
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
    <Surface style={styles.diceContainer} elevation={3} mode="elevated">
      <View style={styles.diceButtonContainer}>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D4')}
          icon="dice-d4"
        >
          D4
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D6')}
          icon="dice-d6"
        >
          D6
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D8')}
          icon="dice-d8"
        >
          D8
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D10')}
          icon="dice-d10"
        >
          D10
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D12')}
          icon="dice-d12"
        >
          D12
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D20')}
          icon="dice-d20"
        >
          D20
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          style={styles.diceButton}
          onPress={() => addDie('D100')}
        >
          D100
        </Button>
        <Button
          mode="outlined"
          buttonColor="transparent"
          textColor={theme.colors.secondary}
          style={[styles.clearButton, { borderColor: theme.colors.secondary }]}
          onPress={clearPool}
          disabled={poolEmpty}
          icon="delete-sweep"
        >
          Clear
        </Button>
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  diceContainer: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 4
  },
  diceButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16
  },
  diceButton: {
    margin: 8,
    minWidth: 80
  },
  clearButton: {
    margin: 8,
    minWidth: 100
  }
})
