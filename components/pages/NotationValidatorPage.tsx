import { View } from '@/components/atoms'
import { NotationValidatorForm } from '@/components/molecules'
import { MainLayout } from '@/components/templates'
import { validateNotation } from '@randsum/notation'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'

type NotationFormData = {
  notation: string
}

export function NotationValidatorPage() {
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
    <MainLayout>
      <View style={styles.content}>
        <NotationValidatorForm
          notation={notationValue || ''}
          onNotationChange={handleNotationChange}
          validationResult={validationResult}
        />
      </View>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 24
  }
})
