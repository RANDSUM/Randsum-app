import DiceButtons from '@/components/DiceButtons'
import DiceDetailsModal from '@/components/DiceDetailsModal'
import DicePool from '@/components/DicePool'
import NotationInputModal from '@/components/NotationInputModal'
import RollDetailsModal from '@/components/RollDetailsModal'
import RollResultsModal from '@/components/RollResultsModal'
import { View, useAppTheme } from '@/components/Themed'
import { useModal } from '@/contexts/ModalContext'
import { StyleSheet } from 'react-native'

export default function Index() {
  const theme = useAppTheme()
  const {
    showRollResults,
    showRollDetails,
    showDiceDetails,
    showNotationInput,
    selectedDieId,
    closeRollResults,
    closeRollDetails,
    closeDiceDetails,
    closeNotationInput
  } = useModal()

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DicePool />
      <DiceButtons />

      <RollResultsModal
        visible={showRollResults}
        onDismiss={closeRollResults}
      />

      <RollDetailsModal
        visible={showRollDetails}
        onDismiss={closeRollDetails}
      />

      <DiceDetailsModal
        visible={showDiceDetails}
        onDismiss={closeDiceDetails}
        dieId={selectedDieId}
      />

      <NotationInputModal
        visible={showNotationInput}
        onDismiss={closeNotationInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 24,
    flex: 1,
    justifyContent: 'center'
  }
})
