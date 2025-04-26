import NotationValidatorForm from '@/components/NotationValidatorForm'
import { View, useAppTheme } from '@/components/Themed'
import { validateNotation } from '@randsum/notation'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'

type NotationFormData = {
  notation: string
}

export default function Validate() {
  const theme = useAppTheme()

  const { watch } = useForm<NotationFormData>({
    defaultValues: {
      notation: ''
    },
    mode: 'onChange'
  })

  // Watch the notation field to validate in real-time
  const notationValue = watch('notation')
  const validationResult = notationValue?.trim()
    ? validateNotation(notationValue)
    : null

  const handleNotationChange = (text: string) => {
    // This function is passed to the NotationValidatorForm component
    // and will be called by the form's Controller
    return text
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <NotationValidatorForm
        notation={notationValue || ''}
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
