import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { Portal, Snackbar, Text, useAppTheme } from '@/components/atoms'
import { Store } from '@/store'
import { useMemoizedDiceNotation } from '@/utils/memoized'

export function RollResultsToast() {
  const theme = useAppTheme()
  const currentRoll = Store.use.currentRoll()
  const rollResult = currentRoll.rollResult
  const dicePool = currentRoll.dicePool
  const rollSource = currentRoll.rollSource
  const visible = Store.use.modals().showRollResults
  const closeRollResults = Store.use.closeRollResults()
  const openRollDetails = Store.use.openRollDetails()
  const commonDiceNotation = useMemoizedDiceNotation(dicePool)

  const onDismiss = useCallback(() => {
    closeRollResults()
  }, [closeRollResults])

  const handleShowDetails = useCallback(() => {
    onDismiss()
    openRollDetails()
  }, [onDismiss, openRollDetails])

  if (!rollResult) {
    return null
  }

  return (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={5000}
        style={[
          styles.toast,
          { backgroundColor: theme.colors.elevation.level3 }
        ]}
        action={{
          label: 'DETAILS',
          onPress: handleShowDetails,
          color: theme.colors.primary
        }}
      >
        <View style={styles.toastContent}>
          <Text style={styles.notation}>
            {rollSource.type === 'saved' && rollSource.name
              ? rollSource.name
              : commonDiceNotation}
          </Text>
          <Text style={styles.total}>{rollResult.total}</Text>
        </View>
      </Snackbar>
    </Portal>
  )
}

const styles = StyleSheet.create({
  toast: {
    borderRadius: 8,
    marginBottom: 16,
    maxWidth: 500,
    alignSelf: 'center',
    marginHorizontal: 16
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 4
  },
  notation: {
    fontSize: 14,
    opacity: 0.8
  },
  total: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16
  }
})
