import { Button, Text, View, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function RollResultsModal() {
  const router = useRouter()
  const theme = useAppTheme()
  const { rollResult } = useCurrentRoll()

  if (!rollResult) {
    router.back()
    return null
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Roll Results',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          }
        }}
      />

      <View style={styles.centeredContent}>
        <Text variant="displayLarge" style={styles.modalTotal}>
          {rollResult.total}
        </Text>

        <Button
          mode="outlined"
          onPress={() => router.push('/roll-details')}
          style={styles.detailsButton}
        >
          Show Details
        </Button>
      </View>

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
    height: '100%',
    padding: 24
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTotal: {
    textAlign: 'center',
    fontSize: 96,
    lineHeight: 100,
    fontWeight: 'bold'
  },
  detailsButton: {
    marginTop: 24
  },
  closeButton: {
    marginTop: 16
  }
})
