import * as Haptics from 'expo-haptics'
import { Platform } from 'react-native'

export class HapticService {
  static light() {
    if (Platform.OS === 'web') return
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }
  static medium() {
    if (Platform.OS === 'web') return
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }
}
