import { IconButton, Surface, Text, useAppTheme } from '@/components/Themed'
import { DieLabel } from '@/types/dice'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

type DicePoolTileProps = {
  type: DieLabel
  count: number
  onRemove: (type: DieLabel) => void
  shouldShake?: boolean
}

export default function DicePoolTile({
  type,
  count,
  onRemove,
  shouldShake = false
}: DicePoolTileProps) {
  const theme = useAppTheme()
  const shakeAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (shouldShake) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnimation, {
          toValue: -5,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnimation, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        })
      ]).start()
    }
  }, [shouldShake, count, shakeAnimation])

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnimation }]
      }}
    >
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
          size={14}
          iconColor={theme.colors.onTertiaryContainer}
          onPress={() => onRemove(type)}
          style={styles.removeButton}
          containerColor="transparent"
        />
      </Surface>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  poolDie: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 6,
    margin: 6,
    height: 52,
    width: 140,
    justifyContent: 'space-between'
  },
  dieNotation: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginLeft: 12
  },
  removeButton: {
    margin: 0,
    width: 28,
    height: 28
  }
})
