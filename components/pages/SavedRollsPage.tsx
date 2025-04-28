import { FlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'

import { ActivityIndicator, Text, View, useAppTheme } from '@/components/atoms'
import { SavedRollItem } from '@/components/molecules'
import { MainLayout } from '@/components/templates'
import { Store } from '@/store'

export function SavedRollsPage() {
  const theme = useAppTheme()
  const savedRolls = Store.use.savedRolls().rolls
  const isLoading = Store.use.savedRolls().isLoading

  if (isLoading) {
    return (
      <MainLayout>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </MainLayout>
    )
  }

  if (savedRolls.length === 0) {
    return (
      <MainLayout>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No saved rolls yet</Text>
          <Text style={styles.emptySubtext}>
            Save your favorite dice combinations to roll them again later
          </Text>
        </View>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <FlashList
        data={savedRolls}
        renderItem={({ item }) => <SavedRollItem roll={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContent}
      />
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContent: {
    padding: 16
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    maxWidth: 300
  }
})
