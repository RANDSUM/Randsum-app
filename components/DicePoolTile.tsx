import { IconButton, Surface, Text, useAppTheme } from '@/components/Themed'
import { useCurrentRoll } from '@/contexts/CurrentRollContext'
import { useModal } from '@/contexts/ModalContext'
import { PoolDie } from '@/types/dice'
import { triggerDiceRemove } from '@/utils/haptics'
import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'

type DicePoolTileProps = {
  die: PoolDie
}

export default function DicePoolTile({ die }: DicePoolTileProps) {
  const { recentlyAddedDie, removeDie } = useCurrentRoll()
  const { openDiceDetails } = useModal()
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

  const handleRemove = () => {
    triggerDiceRemove()
    removeDie(die.id)
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnimation }]
      }}
    >
      <Pressable onPress={() => openDiceDetails(die.id)}>
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
