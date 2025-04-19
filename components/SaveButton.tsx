import { Button, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function SaveButton() {
  const theme = useAppTheme()

  // Placeholder function for future implementation
  const handleSave = () => {
    // Save functionality will be implemented later
    console.log('Save button pressed')
  }

  return (
    <Button
      icon="content-save"
      mode="contained"
      onPress={handleSave}
      buttonColor={theme.colors.tertiary}
      textColor={theme.colors.onTertiary}
      style={styles.saveButton}
    >
      Save
    </Button>
  )
}

const styles = StyleSheet.create({
  saveButton: {
    margin: 4,
    width: 110,
    height: 40
  }
})
