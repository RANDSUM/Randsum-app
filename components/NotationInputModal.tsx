import { Button, Dialog, Portal, useAppTheme } from '@/components/Themed'
import { AppStore } from '@/store'
import { validateNotation } from '@randsum/notation'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet } from 'react-native'
import NotationValidatorForm from './NotationValidatorForm'

type NotationFormData = {
  notation: string
}

export default function NotationInputModal() {
  const theme = useAppTheme()
  const visible = AppStore.use.modals().showNotationInput
  const closeNotationInput = AppStore.use.closeNotationInput()
  const addNotationDie = AppStore.use.addNotationDie()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    watch
  } = useForm<NotationFormData>({
    defaultValues: {
      notation: ''
    },
    mode: 'onChange'
  })

  // Watch the notation field to validate in real-time
  const notationValue = watch('notation')
  const validationResult = notationValue.trim()
    ? validateNotation(notationValue)
    : null

  const onDismiss = () => closeNotationInput()

  const onSubmit = (data: NotationFormData) => {
    if (validationResult?.valid) {
      addNotationDie(data.notation)
      handleDismiss()
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
        style={[styles.dialog, { backgroundColor: theme.colors.background }]}
      >
        <Dialog.Title style={styles.title}>Custom Notation</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <ScrollView style={styles.modalScroll}>
            <Controller
              control={control}
              name="notation"
              rules={{
                validate: (value) => {
                  if (!value.trim()) return 'Notation is required'
                  const result = validateNotation(value)
                  return result.valid || 'Invalid dice notation'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <NotationValidatorForm
                  notation={value}
                  onNotationChange={onChange}
                  validationResult={validationResult}
                />
              )}
            />
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button mode="outlined" onPress={handleDismiss} style={styles.button}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || !validationResult?.valid}
            style={styles.button}
            buttonColor={theme.colors.tertiary}
            textColor={theme.colors.onTertiary}
          >
            Add to Pool
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
    padding: 8,
    maxWidth: '95%',
    width: 500,
    maxHeight: '90%',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  content: {
    paddingVertical: 8,
    maxHeight: 500
  },
  modalScroll: {
    flex: 1
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  button: {
    flex: 1,
    marginHorizontal: 4
  }
})
