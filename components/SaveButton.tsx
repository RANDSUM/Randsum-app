import { Button, useAppTheme } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function SaveButton() {
  const theme = useAppTheme()

  return (
    <Button
      icon="content-save"
      mode="contained"
      disabled={true}
      buttonColor={theme.colors.tertiary}
      textColor={theme.colors.onTertiary}
      style={[styles.saveButton, { opacity: 0.5 }]}
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
