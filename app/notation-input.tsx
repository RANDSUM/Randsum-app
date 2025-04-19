import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useAppTheme
} from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { validateNotation } from '@randsum/notation'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export default function NotationInput() {
  const router = useRouter()
  const theme = useAppTheme()
  const { addNotationDie } = useCurrentRoll()
  const [notation, setNotation] = useState('')
  const [validationResult, setValidationResult] = useState<ReturnType<
    typeof validateNotation
  > | null>(null)
  const [confirmVisible, setConfirmVisible] = useState(false)

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

  const hideConfirmation = () => {
    setConfirmVisible(false)
  }

  const isValid = validationResult?.valid || false

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Dice Notation
      </Text>

      <TextInput
        label="Enter Dice Notation"
        value={notation}
        onChangeText={handleNotationChange}
        style={styles.input}
        placeholder="e.g. 2D6+3 or 4D8L"
        autoCapitalize="none"
        autoCorrect={false}
        error={notation.length > 0 && !isValid}
      />

      {validationResult && (
        <View style={styles.validationContainer}>
          <Text
            style={[
              styles.validationText,
              {
                color: isValid ? theme.colors.tertiary : theme.colors.error
              }
            ]}
          >
            {isValid ? 'Valid notation' : 'Invalid notation'}
          </Text>

          {isValid && validationResult.description.length > 0 && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description:</Text>
              {validationResult.description.map((desc, index) => (
                <Text key={index} style={styles.descriptionText}>
                  {desc}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}

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

      <Portal>
        <Dialog
          visible={confirmVisible}
          onDismiss={hideConfirmation}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title>Invalid Notation</Dialog.Title>
          <Dialog.Content>
            <Text>
              The dice notation you entered is not valid. Please check your
              syntax and try again.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideConfirmation}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1B1F'
  },
  title: {
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    marginBottom: 16
  },
  validationContainer: {
    marginBottom: 24
  },
  validationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  descriptionContainer: {
    backgroundColor: 'rgba(154, 130, 219, 0.1)',
    padding: 16,
    borderRadius: 8
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  descriptionText: {
    marginBottom: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  button: {
    flex: 1,
    marginHorizontal: 8
  }
})
