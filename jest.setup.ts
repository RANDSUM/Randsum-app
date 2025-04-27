// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock expo-font to fix the loadedNativeFonts.forEach is not a function error
jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  isLoaded: jest.fn(() => true)
}))

jest.mock('@/store', () => ({
  AppStore: {
    use: {
      currentRoll: jest.fn().mockReturnValue({
        dicePool: []
      }),
      addDie: jest.fn(),
      openNotationInput: jest.fn(),
      rollDice: jest.fn(),
      addSavedRoll: jest.fn(),
      clearDicePool: jest.fn()
    }
  },
  createSavedRoll: jest.fn()
}))
