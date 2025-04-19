import { IconButton, Surface, Text, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { PoolDie } from '@/types/dice'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

type DicePoolTileProps = {
  die: PoolDie
}

export default function DicePoolTile({ die }: DicePoolTileProps) {
  const { recentlyAddedDie, removeDie } = useCurrentRoll()
  const theme = useAppTheme()
  const shouldShake = die.id === recentlyAddedDie || false
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
  }, [shouldShake, die.id, shakeAnimation])

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
          {die._type === 'notation'
            ? die.sides.notation
            : `${die.quantity}D${die.sides}`}
        </Text>
        <IconButton
          icon="close"
          size={14}
          iconColor={theme.colors.onTertiaryContainer}
          onPress={function () {
            removeDie(die.id)
          }}
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
  dieNotation: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 12
  },

  removeButton: {
    margin: 0,
    width: 28,
    height: 28
  }
})
