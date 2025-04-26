import NotationValidator from '@/components/NotationValidator'
import { View, useAppTheme } from '@/components/Themed'
import { validateNotation } from '@randsum/notation'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

export default function Validate() {
  const theme = useAppTheme()
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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <NotationValidator
        notation={notation}
        onNotationChange={handleNotationChange}
        validationResult={validationResult}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between'
  }
})
