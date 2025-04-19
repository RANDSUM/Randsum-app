import * as Haptics from 'expo-haptics'

export const triggerDiceAdd = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

export const triggerDiceRemove = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}
