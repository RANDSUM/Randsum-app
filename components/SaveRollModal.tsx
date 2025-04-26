import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useAppTheme
} from '@/components/Themed'
import { createSavedRoll, useStore } from '@/store'
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

export default function SaveRollModal({
  visible,
  onDismiss
}: SaveRollModalProps) {
  const theme = useAppTheme()
  const router = useRouter()
  const dicePool = useStore.use.currentRoll().dicePool
  const addSavedRoll = useStore.use.addSavedRoll()

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
    router.push('/(drawer)/saved-rolls')
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
              required: 'Please enter a name for this roll',
              minLength: {
                value: 1,
                message: 'Name cannot be empty'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Roll Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                autoFocus
                error={!!errors.name}
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: theme.colors.error, marginTop: 8 }}>
              {errors.name.message}
            </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            buttonColor={theme.colors.tertiary}
            textColor={theme.colors.onTertiary}
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
  }
})
