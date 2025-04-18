import {
  Button,
  Card,
  Surface,
  Text,
  useAppTheme,
  View
} from '@/components/Themed'
import { ScrollView, StyleSheet } from 'react-native'

export default function Index() {
  const theme = useAppTheme()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Dice Roller
        </Text>
      </View>

      <Surface style={styles.diceContainer} elevation={3} mode="elevated">
        <Text variant="displayLarge" style={styles.diceResult}>
          20
        </Text>
        <Text variant="bodyMedium" style={styles.diceType}>
          D20
        </Text>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D4
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D6
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D8
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D10
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D12
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D20
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.diceButton}
        >
          D100
        </Button>
      </View>

      <Card style={styles.historyCard}>
        <Card.Title title="Roll History" />
        <Card.Content>
          <View style={styles.historyItem}>
            <Text style={styles.historyDice}>D20</Text>
            <Text style={styles.historyResult}>20</Text>
            <Text style={styles.historyCritical}>Critical Hit!</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyDice}>D6</Text>
            <Text style={styles.historyResult}>3</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyDice}>D10</Text>
            <Text style={styles.historyResult}>1</Text>
            <Text
              style={[styles.historyCritical, { color: theme.colors.error }]}
            >
              Critical Miss!
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actionButtons}>
        <Button
          mode="outlined"
          buttonColor="transparent"
          textColor={theme.colors.secondary}
          style={[styles.actionButton, { borderColor: theme.colors.secondary }]}
        >
          Clear History
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.tertiary}
          textColor={theme.colors.onTertiary}
          style={styles.actionButton}
        >
          Save Results
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16
  },
  diceContainer: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
    borderRadius: 16
  },
  diceResult: {
    fontSize: 72,
    fontWeight: 'bold'
  },
  diceType: {
    marginTop: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24
  },
  diceButton: {
    margin: 8,
    minWidth: 80
  },
  historyCard: {
    marginBottom: 24
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)'
  },
  historyDice: {
    width: 50
  },
  historyResult: {
    width: 50,
    fontWeight: 'bold'
  },
  historyCritical: {
    flex: 1,
    color: '#0047AB',
    fontWeight: 'bold'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8
  }
})
