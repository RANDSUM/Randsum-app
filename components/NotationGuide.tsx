import { Text, View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function NotationGuide() {
  return (
    <View style={styles.guideContainer}>
      <Text style={styles.guideTitle}>Basic Notation</Text>
      <View style={styles.basicNotation}>
        <Text style={styles.modifierText}>
          2D20 = Roll two twenty-sided dice
        </Text>
        <Text style={styles.modifierText}>4D6 = Roll four six-sided dice</Text>
      </View>

      <Text style={styles.guideTitle}>Modifiers</Text>
      <View style={styles.modifierGrid}>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Add/Sub: +2/-1</Text>
          <Text style={styles.modifierExample}>2D6+2 or 4D8-1</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Drop: L2/H2</Text>
          <Text style={styles.modifierExample}>Drop lowest/highest 2</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Cap: C{'{>18}'}</Text>
          <Text style={styles.modifierExample}>Cap rolls over 18</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Drop: D{'{>17}'}</Text>
          <Text style={styles.modifierExample}>Drop rolls over 17</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Reroll: R{'{<5}'}</Text>
          <Text style={styles.modifierExample}>Reroll under 5</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Replace: V{'{8=12}'}</Text>
          <Text style={styles.modifierExample}>Replace 8s with 12s</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Unique: U</Text>
          <Text style={styles.modifierExample}>All results unique</Text>
        </View>
        <View style={styles.modifierItem}>
          <Text style={styles.modifierText}>Explode: !</Text>
          <Text style={styles.modifierExample}>Reroll max values</Text>
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
