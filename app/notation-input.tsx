import NotationValidator from '@/components/NotationValidator'
import { Button, useAppTheme, View } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { validateNotation } from '@randsum/notation'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

export default function NotationInput() {
  const router = useRouter()
  const theme = useAppTheme()
  const { addNotationDie } = useCurrentRoll()
  const [notation, setNotation] = useState('')
  const [validationResult, setValidationResult] = useState<ReturnType<
    typeof validateNotation
  > | null>(null)

  const handleNotationChange = (text: string) => {
    setNotation(text)
    if (text.trim()) {
      const result = validateNotation(text)
      setValidationResult(result)
    } else {
      setValidationResult(null)
    }
  }

  const handleAddDie = () => {
    if (validationResult?.valid) {
      addNotationDie(notation)
      router.back()
    }
  }

  const isValid = validationResult?.valid || false

  return (
    <View style={styles.container}>
      <NotationValidator
        notation={notation}
        onNotationChange={handleNotationChange}
        validationResult={validationResult}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleAddDie}
          disabled={!isValid}
          style={styles.button}
          buttonColor={theme.colors.tertiary}
          textColor={theme.colors.onTertiary}
        >
          Add to Pool
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-between',
    height: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },
  button: {
    flex: 1
  }
})
