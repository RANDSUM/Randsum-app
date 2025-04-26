import NotationValidator from '@/components/NotationValidator'
import { Button, Dialog, Portal, useAppTheme } from '@/components/Themed'
import { Actions } from '@/contexts/actions'
import { useAppContext } from '@/contexts/AppContext'
import { validateNotation } from '@randsum/notation'
import { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function NotationInputModal() {
  const theme = useAppTheme()
  const {
    state: {
      modals: { showNotationInput: visible }
    },
    addNotationDie,
    dispatch
  } = useAppContext()
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
  const onDismiss = () => () => dispatch(Actions.closeNotationInput())

  const handleAddDie = () => {
    if (validationResult?.valid) {
      addNotationDie(notation)
      handleDismiss()
    }
  }

  const handleDismiss = () => {
    setNotation('')
    setValidationResult(null)
    onDismiss()
  }

  const isValid = validationResult?.valid || false

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
            <NotationValidator
              notation={notation}
              onNotationChange={handleNotationChange}
              validationResult={validationResult}
            />
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button mode="outlined" onPress={handleDismiss} style={styles.button}>
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
