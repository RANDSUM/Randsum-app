import { Button, Text, View, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { Stack, useRouter } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'

export default function RollDetailsModal() {
  const router = useRouter()
  const theme = useAppTheme()
  const { rollResult, getDiceNotation, groupRollResults } = useCurrentRoll()

  if (!rollResult) {
    router.back()
    return null
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Roll Details',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          }
        }}
      />

      <ScrollView style={styles.modalScroll}>
        <Text style={styles.modalNotation}>{getDiceNotation()}</Text>
        {groupRollResults(rollResult).map((group, groupIndex) => (
          <View key={groupIndex} style={styles.modalResultItem}>
            <Text style={styles.modalDieType}>{group.label}:</Text>
            <View style={styles.diceResultsRow}>
              <View style={styles.modalDieResults}>
                {group.results.map((roll, index) => (
                  <View key={`active-${index}`} style={styles.modalDieValue}>
                    <Text style={styles.modalDieValueText}>{roll}</Text>
                  </View>
                ))}
                {group.rejectedRolls.map((roll, index) => (
                  <View
                    key={`rejected-${index}`}
                    style={[styles.modalDieValue, styles.droppedDie]}
                  >
                    <Text
                      style={[styles.modalDieValueText, styles.droppedDieText]}
                    >
                      {roll}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.rowTotalContainer}>
                <Text style={styles.rowTotalEquals}>=</Text>
                <Text style={styles.rowTotal}>{group.total}</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.finalTotalContainer}>
          <Text style={styles.finalTotalLabel}>Total</Text>
          <Text style={styles.finalTotal}>{rollResult.total}</Text>
        </View>
      </ScrollView>

      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        Close
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 24
  },
  modalScroll: {
    flex: 1
  },
  modalNotation: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.8
  },
  modalResultItem: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalDieType: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'right',
    marginRight: 8
  },
  diceResultsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalDieResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 8
  },
  modalDieValue: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalDieValueText: {
    fontWeight: 'bold'
  },
  droppedDie: {
    opacity: 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed'
  },
  droppedDieText: {
    textDecorationLine: 'line-through',
    opacity: 0.6
  },
  rowTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8
  },
  rowTotalEquals: {
    marginRight: 4,
    opacity: 0.7
  },
  rowTotal: {
    fontWeight: 'bold',
    fontSize: 16
  },
  finalTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 16
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    opacity: 0.7
  },
  finalTotal: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  closeButton: {
    marginTop: 16
  }
})
