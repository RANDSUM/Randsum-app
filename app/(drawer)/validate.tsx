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

  const { watch, setValue } = useForm<NotationFormData>({
    defaultValues: {
      notation: ''
    },
    mode: 'onChange'
  })

  const notationValue = watch('notation')
  const validationResult = notationValue?.trim()
    ? validateNotation(notationValue)
    : null

  const handleNotationChange = (text: string) => {
    setValue('notation', text)
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
