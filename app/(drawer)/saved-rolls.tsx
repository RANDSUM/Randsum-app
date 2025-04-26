import SavedRollItem from '@/components/SavedRollItem'
import { ActivityIndicator, Text, View, useAppTheme } from '@/components/Themed'
import { useStore } from '@/store'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'

export default function SavedRolls() {
  const theme = useAppTheme()
  const savedRolls = useStore.use.savedRolls().rolls
  const isLoading = useStore.use.savedRolls().isLoading

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  if (savedRolls.length === 0) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: theme.colors.background }
        ]}
      >
        <Text style={styles.emptyText}>No saved rolls yet</Text>
        <Text style={styles.emptySubtext}>
          Save your favorite dice combinations to roll them again later
        </Text>
      </View>
    )
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlashList
        data={savedRolls}
        renderItem={({ item }) => <SavedRollItem roll={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        estimatedItemSize={150}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  listContent: {
    padding: 16
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  emptySubtext: {
    textAlign: 'center',
    opacity: 0.7,
    maxWidth: '80%'
  }
})
