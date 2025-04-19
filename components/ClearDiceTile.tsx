import { Surface, Text, useAppTheme } from '@/components/Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'

type ClearDiceTileProps = {
  onPress: () => void
}

export default function ClearDiceTile({ onPress }: ClearDiceTileProps) {
  const theme = useAppTheme()

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Surface
        style={[
          styles.clearTile,
          { backgroundColor: theme.colors.errorContainer }
        ]}
        elevation={2}
      >
        <Text
          style={[styles.clearText, { color: theme.colors.onErrorContainer }]}
        >
          Clear
        </Text>
      </Surface>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  clearTile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 6,
    margin: 4,
    height: 40,
    width: 100,
    justifyContent: 'center'
  },
  clearText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  }
})
