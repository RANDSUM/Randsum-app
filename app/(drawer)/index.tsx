import DiceButtons from '@/components/DiceButtons'
import DiceDetailsModal from '@/components/DiceDetailsModal'
import DicePool from '@/components/DicePool'
import NotationInputModal from '@/components/NotationInputModal'
import RollDetailsModal from '@/components/RollDetailsModal'
import RollResultsModal from '@/components/RollResultsModal'
import { View, useAppTheme } from '@/components/Themed'
import { Actions } from '@/contexts/actions'
import { useAppContext } from '@/contexts/AppContext'
import { StyleSheet } from 'react-native'

export default function Index() {
  const theme = useAppTheme()
  const {
    state: {
      modals: {
        showRollResults,
        showRollDetails,
        showDiceDetails,
        showNotationInput,
        selectedDieId
      }
    },
    dispatch
  } = useAppContext()

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DicePool />
      <DiceButtons />

      <RollResultsModal
        visible={showRollResults}
        onDismiss={() => dispatch(Actions.closeRollResults())}
      />

      <RollDetailsModal
        visible={showRollDetails}
        onDismiss={() => dispatch(Actions.closeRollDetails())}
      />

      <DiceDetailsModal
        visible={showDiceDetails}
        onDismiss={() => dispatch(Actions.closeDiceDetails())}
        dieId={selectedDieId}
      />

      <NotationInputModal
        visible={showNotationInput}
        onDismiss={() => dispatch(Actions.closeNotationInput())}
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
