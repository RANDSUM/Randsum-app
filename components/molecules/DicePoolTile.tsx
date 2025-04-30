import { useCallback, useEffect, useMemo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated'

import { IconButton, Surface, Text, useAppTheme } from '@/components/atoms'
import { useDicePoolState } from '@/store'
import { PoolDie, getDieNotation } from '@/types/dice'
import { HapticService } from '@/utils/haptics'

type DicePoolTileProps = {
  die: PoolDie
}

export function DicePoolTile({ die }: DicePoolTileProps) {
  const recentlyAddedDie = useDicePoolState.use.recentlyAddedDie()
  const openDiceDetails = useDicePoolState.use.openDiceDetails()
  const removeDie = useDicePoolState.use.removeDie()

  const theme = useAppTheme()

  const shouldShake = useMemo(
    () => die.id === recentlyAddedDie || false,
    [die.id, recentlyAddedDie]
  )

  // Use shared values for the animations
  const translateX = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  // Define the animated style using the shared values
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { scale: scale.value }],
      opacity: opacity.value
    }
  })

  const triggerHaptic = useCallback(() => {
    HapticService.light()
  }, [])

  const startShakeAnimation = useCallback(() => {
    'worklet'

    translateX.value = withSequence(
      withTiming(5, { duration: 50, easing: Easing.linear }),
      withTiming(-5, { duration: 50, easing: Easing.linear }),
      withTiming(5, { duration: 50, easing: Easing.linear }),
      withTiming(0, { duration: 50, easing: Easing.linear })
    )

    scale.value = withSequence(
      withTiming(1.05, { duration: 100, easing: Easing.inOut(Easing.quad) }),
      withTiming(1, { duration: 100, easing: Easing.inOut(Easing.quad) })
    )

    opacity.value = withSequence(
      withTiming(0.8, { duration: 50 }),
      withTiming(1, { duration: 50 })
    )

    runOnJS(triggerHaptic)()
  }, [translateX, scale, opacity, triggerHaptic])

  useEffect(() => {
    if (shouldShake) {
      startShakeAnimation()
    }
  }, [shouldShake, startShakeAnimation])

  const handlePress = useCallback(() => {
    openDiceDetails(die.id)
  }, [die.id, openDiceDetails])

  const handleRemove = useCallback(() => {
    removeDie(die.id)
  }, [die.id, removeDie])

  const dieNotation = useMemo(() => getDieNotation(die), [die])

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={handlePress}>
        <Surface
          style={[
            styles.poolDie,
            { backgroundColor: theme.colors.tertiaryContainer }
          ]}
          elevation={2}
        >
          <Animated.View style={styles.contentContainer}>
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
          </Animated.View>
        </Surface>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  poolDie: {
    borderRadius: 8,
    minWidth: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dieNotation: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  removeButton: {
    margin: 0,
    padding: 0,
    width: 20,
    height: 20
  }
})
