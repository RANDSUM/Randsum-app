import { IconButton, Surface, Text, useAppTheme } from '@/components/Themed'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

type DicePoolTileProps = {
  label: string
  count: number
  type: 'numeric' | 'notation'
  onRemove: (type: string) => void
  shouldShake?: boolean
}

export default function DicePoolTile({
  label,
  count,
  type,
  onRemove,
  shouldShake = false
}: DicePoolTileProps) {
  const theme = useAppTheme()
  const shakeAnimation = useRef(new Animated.Value(0)).current

  const isNotationDie = type === 'notation'

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
  }, [shouldShake, label, shakeAnimation])

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnimation }]
      }}
    >
      <Surface
        style={[
          styles.poolDie,
          isNotationDie && styles.notationPoolDie,
          { backgroundColor: theme.colors.tertiaryContainer }
        ]}
        elevation={2}
      >
        <Text
          style={[
            styles.dieNotation,
            isNotationDie && styles.notationDieText,
            { color: theme.colors.onTertiaryContainer }
          ]}
        >
          {isNotationDie ? label : `${count}${label}`}
        </Text>
        <IconButton
          icon="close"
          size={14}
          iconColor={theme.colors.onTertiaryContainer}
          onPress={() => onRemove(label)}
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
    margin: 4,
    height: 52,
    minHeight: 52,
    maxHeight: 52,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  notationPoolDie: {},
  dieNotation: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 12
  },
  notationDieText: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 8,
    marginRight: 4,
    lineHeight: 20
  },
  removeButton: {
    margin: 0,
    width: 28,
    height: 28
  }
})
