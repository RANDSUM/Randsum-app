import {
  Button,
  Dialog,
  Portal,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { useStore } from '@/store/useStore'
import { getCommonDiceNotation } from '@/utils/diceNotation'
import { StyleSheet } from 'react-native'

export default function RollResultsModal() {
  const theme = useAppTheme()
  const rollResult = useStore.use.currentRoll().rollResult
  const dicePool = useStore.use.currentRoll().dicePool
  const visible = useStore.use.modals().showRollResults
  const closeRollResults = useStore.use.closeRollResults()
  const openRollDetails = useStore.use.openRollDetails()

  if (!rollResult) {
    return null
  }

  const commonDiceNotation = getCommonDiceNotation(dicePool)

  const onDismiss = () => {
    closeRollResults()
  }

  const handleShowDetails = () => {
    onDismiss()
    openRollDetails()
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.dialog, { backgroundColor: theme.colors.background }]}
      >
        <Dialog.Title style={styles.title}>Roll Results</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Text style={styles.modalNotation}>{commonDiceNotation}</Text>
          <View style={styles.centeredContent}>
            <Text variant="displayLarge" style={styles.modalTotal}>
              {rollResult.total}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleShowDetails}
            style={styles.detailsButton}
          >
            Show Details
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={onDismiss}
          >
            Close
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
    maxWidth: '90%',
    width: 400,
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  content: {
    paddingVertical: 16
  },
  modalNotation: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.8
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTotal: {
    textAlign: 'center',
    fontSize: 72,
    lineHeight: 80,
    fontWeight: 'bold'
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  detailsButton: {
    marginRight: 8
  }
})
