import { IconButton, Surface, Text, useAppTheme } from '@/components/Themed'
import { DieLabel } from '@/types/dice'
import { StyleSheet } from 'react-native'

type DicePoolTileProps = {
  type: DieLabel
  count: number
  onRemove: (type: DieLabel) => void
}

export default function DicePoolTile({
  type,
  count,
  onRemove
}: DicePoolTileProps) {
  const theme = useAppTheme()

  return (
    <Surface
      style={[
        styles.poolDie,
        { backgroundColor: theme.colors.tertiaryContainer }
      ]}
      elevation={2}
    >
      <Text
        style={[
          styles.dieNotation,
          { color: theme.colors.onTertiaryContainer }
        ]}
      >
        {count}
        {type}
      </Text>
      <IconButton
        icon="close"
        size={16}
        iconColor={theme.colors.onTertiaryContainer}
        onPress={() => onRemove(type)}
        style={styles.removeButton}
        containerColor="transparent"
      />
    </Surface>
  )
}

const styles = StyleSheet.create({
  poolDie: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 6,
    margin: 4,
    height: 40,
    width: 100,
    justifyContent: 'space-between'
  },
  dieNotation: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    marginLeft: 8
  },
  removeButton: {
    margin: 0,
    width: 32,
    height: 32
  }
})
