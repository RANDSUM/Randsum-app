import * as Haptics from 'expo-haptics'
import { Platform } from 'react-native'

export const triggerDiceAdd = () => {
  if (Platform.OS === 'web') return
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

export const triggerDiceRemove = () => {
  if (Platform.OS === 'web') return
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}
