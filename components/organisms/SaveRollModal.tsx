import {
  Button,
  Dialog,
  Portal,
  TextInput,
  useAppTheme
} from '@/components/atoms'
import { Store, createSavedRoll } from '@/store'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'

type SaveRollModalProps = {
  visible: boolean
  onDismiss: () => void
}

type SaveRollFormData = {
  name: string
}

export function SaveRollModal({ visible, onDismiss }: SaveRollModalProps) {
  const theme = useAppTheme()
  const router = useRouter()
  const dicePool = Store.use.currentRoll().dicePool
  const addSavedRoll = Store.use.addSavedRoll()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SaveRollFormData>({
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (data: SaveRollFormData) => {
    const newRoll = createSavedRoll(data.name, dicePool)

    addSavedRoll(newRoll)
    handleDismiss()
    router.push('/(tabs)/saved-rolls')
  }

  const handleDismiss = () => {
    reset()
    onDismiss()
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleDismiss}
        style={{ backgroundColor: theme.colors.surface }}
      >
        <Dialog.Title>Save Roll</Dialog.Title>
        <Dialog.Content>
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                label="Roll Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.name}
                style={styles.input}
              />
            )}
          />
          {errors.name && (
            <Dialog.Content style={styles.errorText}>
              {errors.name.message}
            </Dialog.Content>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 8
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12
  }
})
