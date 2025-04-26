import { Button, Dialog, Portal, Text, TextInput, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { useSavedRolls } from '@/contexts/SavedRollsContext'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

type SaveRollModalProps = {
  visible: boolean
  onDismiss: () => void
}

export default function SaveRollModal({ visible, onDismiss }: SaveRollModalProps) {
  const theme = useAppTheme()
  const router = useRouter()
  const { dicePool } = useCurrentRoll()
  const { saveRoll } = useSavedRolls()
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Please enter a name for this roll')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await saveRoll(name.trim(), dicePool)
      onDismiss()
      router.push('/(drawer)/saved-rolls')
    } catch (err) {
      setError('Failed to save roll. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismiss = () => {
    setName('')
    setError('')
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
          <TextInput
            label="Roll Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoFocus
          />
          {error ? (
            <Text style={{ color: theme.colors.error, marginTop: 8 }}>
              {error}
            </Text>
          ) : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button 
            onPress={handleSave} 
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
