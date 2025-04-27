import { Text, View } from '@/components/atoms'
import { StyleSheet } from 'react-native'

export function NotationGuide() {
  return (
    <View style={styles.guideContainer}>
      <Text style={styles.guideTitle}>Dice Notation Guide</Text>

      <View style={styles.basicNotation}>
        <Text>Basic Format: [quantity]D[sides]</Text>
        <Text>Examples: 1D20, 3D6, 2D8</Text>
      </View>

      <Text style={styles.guideTitle}>Modifiers</Text>
      <View style={styles.modifierGrid}>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>+N</Text>
          <Text style={styles.modifierExample}>2D6+3</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>-N</Text>
          <Text style={styles.modifierExample}>1D20-2</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>K (Keep Highest)</Text>
          <Text style={styles.modifierExample}>4D6K3</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>k (Keep Lowest)</Text>
          <Text style={styles.modifierExample}>4D6k1</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>D (Drop Highest)</Text>
          <Text style={styles.modifierExample}>4D6D1</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>d (Drop Lowest)</Text>
          <Text style={styles.modifierExample}>4D6d1</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>! (Explode)</Text>
          <Text style={styles.modifierExample}>3D6!</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>!N (Explode on N+)</Text>
          <Text style={styles.modifierExample}>3D6!5</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  guideContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(154, 130, 219, 0.1)',
    borderRadius: 8
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8
  },
  basicNotation: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(154, 130, 219, 0.3)'
  },
  modifierGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8
  },
  modifierItem: {
    width: '48%',
    marginBottom: 4
  },
  modifierText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  modifierExample: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)'
  }
})
