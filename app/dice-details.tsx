import { Button, Text, View, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { validateNotation } from '@randsum/notation'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function DiceDetailsModal() {
  const router = useRouter()
  const theme = useAppTheme()
  const { dicePool } = useCurrentRoll()
  const { id } = useLocalSearchParams()

  const die = dicePool.find((die) => die.id === id)
  if (!die) {
    router.back()
    return null
  }

  const description =
    die._type === 'notation'
      ? validateNotation(die.sides.notation).description
      : validateNotation(`${die.quantity}d${die.sides}`).description

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Dice Details',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: theme.colors.elevation.level4
          }
        }}
      />

      <Text variant="displayMedium" style={styles.notation}>
        {die._type === 'notation'
          ? die.sides.notation
          : `${die.quantity}D${die.sides}`}
      </Text>

      <Text style={styles.description}>{description}</Text>

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
    padding: 24
  },
  notation: {
    textAlign: 'center',
    marginBottom: 24
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  closeButton: {
    marginTop: 'auto'
  }
})
