import { validateNotation } from '@randsum/notation'
import { StyleSheet } from 'react-native'

import { NotationGuide } from './NotationGuide'

import { Text, TextInput, View, useAppTheme } from '@/components/atoms'

type NotationValidatorFormProps = {
  notation: string
  onNotationChange?: (text: string) => void
  validationResult: ReturnType<typeof validateNotation> | null
}

export function NotationValidatorForm({
  notation,
  onNotationChange,
  validationResult
}: NotationValidatorFormProps) {
  const theme = useAppTheme()
  const isValid = validationResult?.valid || false

  return (
    <View style={styles.content}>
      <TextInput
        label="Enter Dice Notation"
        value={notation}
        onChangeText={onNotationChange}
        style={styles.input}
        placeholder="e.g. 2D6+3 or 4D8L"
        autoCapitalize="none"
        autoCorrect={false}
        error={notation.length > 0 && !isValid}
      />

      <View style={styles.validationContainer}>
        <View style={styles.descriptionContainer}>
          {(!isValid || notation.length === 0) && (
            <Text
              style={[styles.validationText, { color: theme.colors.error }]}
            >
              Invalid notation
            </Text>
          )}
          {isValid &&
            notation.length > 0 &&
            validationResult &&
            validationResult.description.length > 0 && (
              <>
                <Text style={styles.descriptionTitle}>Description:</Text>
                {validationResult.description.map((desc, index) => (
                  <Text key={index} style={styles.descriptionText}>
                    {desc}
                  </Text>
                ))}
              </>
            )}
        </View>
      </View>

      <NotationGuide />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {},
  input: {
    marginBottom: 16
  },
  validationContainer: {
    marginBottom: 16,
    minHeight: 120,
    justifyContent: 'center'
  },
  emptyValidation: {
    height: 120
  },
  validationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
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
  }
})
