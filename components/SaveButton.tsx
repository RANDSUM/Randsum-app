import { Button, useAppTheme } from '@/components/Themed'
import { AppStore } from '@/store'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import SaveRollModal from './SaveRollModal'

export default function SaveButton() {
  const theme = useAppTheme()
  const dicePool = AppStore.use.currentRoll().dicePool
  const [modalVisible, setModalVisible] = useState(false)

  const disabled = dicePool.length === 0

  const handlePress = () => {
    setModalVisible(true)
  }

  return (
    <>
      <Button
        icon="content-save"
        mode="contained"
        disabled={disabled}
        onPress={handlePress}
        buttonColor={theme.colors.tertiary}
        textColor={theme.colors.onTertiary}
        style={[styles.saveButton, { opacity: disabled ? 0.5 : 1 }]}
      >
        Save
      </Button>

      <SaveRollModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  saveButton: {
    margin: 4,
    width: 110,
    height: 40
  }
})
