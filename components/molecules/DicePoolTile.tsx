import { IconButton, Surface, Text, useAppTheme } from '@/components/atoms'
import { Store } from '@/store'
import { PoolDie, getDieNotation } from '@/types/dice'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'

type DicePoolTileProps = {
  die: PoolDie
}

export function DicePoolTile({ die }: DicePoolTileProps) {
  const recentlyAddedDie = Store.use.currentRoll().recentlyAddedDie
  const openDiceDetails = Store.use.openDiceDetails()
  const removeDie = Store.use.removeDie()

  const theme = useAppTheme()

  // Memoize the shouldShake value to prevent unnecessary calculations
  const shouldShake = useMemo(
    () => die.id === recentlyAddedDie || false,
    [die.id, recentlyAddedDie]
  )

  // Animation setup
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
  }, [shouldShake, shakeAnimation])

  // Memoize handlers to prevent recreation on each render
  const handlePress = useCallback(() => {
    openDiceDetails(die.id)
  }, [die.id, openDiceDetails])

  const handleRemove = useCallback(() => {
    removeDie(die.id)
  }, [die.id, removeDie])

  // Memoize the die notation to prevent recalculation on each render
  const dieNotation = useMemo(() => getDieNotation(die), [die])

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
