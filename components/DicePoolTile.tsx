import { IconButton, Surface, Text, useAppTheme } from '@/components/Themed'
import { Store } from '@/store'
import { PoolDie } from '@/types/dice'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'

type DicePoolTileProps = {
  die: PoolDie
}

export default function DicePoolTile({ die }: DicePoolTileProps) {
  const recentlyAddedDie = Store.use.currentRoll().recentlyAddedDie
  const openDiceDetails = Store.use.openDiceDetails()
  const removeDie = Store.use.removeDie()

  const theme = useAppTheme()

  // Memoize the shouldShake value to prevent unnecessary calculations
  const shouldShake = useMemo(
    () => die.id === recentlyAddedDie || false,
    [die.id, recentlyAddedDie]
  )

  const shakeAnimation = useRef(new Animated.Value(0)).current

  // Memoize the animation sequence to prevent recreation on each render
  const animationSequence = useMemo(
    () =>
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
      ]),
    [shakeAnimation]
  )

  useEffect(() => {
    if (shouldShake) {
      animationSequence.start()
    }
  }, [shouldShake, animationSequence])

  // Memoize handlers to prevent recreation on each render
  const handlePress = useCallback(() => {
    openDiceDetails(die.id)
  }, [die.id, openDiceDetails])

  const handleRemove = useCallback(() => {
    removeDie(die.id)
  }, [die.id, removeDie])

  // Memoize the die notation to prevent recalculation on each render
  const dieNotation = useMemo(
    () =>
      die._type === 'notation'
        ? die.sides.notation
        : `${die.quantity}D${die.sides}`,
    [die]
  )

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnimation }]
      }}
    >
      <Pressable onPress={handlePress}>
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
            {dieNotation}
          </Text>
          <IconButton
            icon="close"
            size={14}
            iconColor={theme.colors.onTertiaryContainer}
            onPress={handleRemove}
            style={styles.removeButton}
            containerColor="transparent"
          />
        </Surface>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  poolDie: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    margin: 4,
    height: 56,
    minHeight: 56,
    maxHeight: 56,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  dieNotation: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 12
  },
  removeButton: {
    margin: 0,
    width: 32,
    height: 32
  }
})
