import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useAppTheme
} from '@/components/Themed'
import { Actions } from '@/contexts/actions'
import { useAppContext } from '@/contexts/AppContext'
import { SavedRoll } from '@/types/savedRolls'
import { generateId } from '@/utils/id'
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
  const {
    dispatch,
    state: {
      currentRoll: { dicePool }
    }
  } = useAppContext()

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
    const newRoll: SavedRoll = {
      id: generateId(),
      name: data.name,
      dicePool,
      createdAt: Date.now()
    }

    try {
      dispatch(Actions.addSavedRoll(newRoll))
      handleDismiss()
      router.push('/(drawer)/saved-rolls')
    } catch (err) {
      // Error is handled by form state
    }
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
