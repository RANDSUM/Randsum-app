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
  Store: {
    use: {
      // DiceSlice state
      currentRoll: jest.fn().mockReturnValue({
        dicePool: [],
        rollResult: null,
        recentlyAddedDie: null
      }),
      // DiceSlice actions
      addDie: jest.fn(),
      addNotationDie: jest.fn(),
      removeDie: jest.fn(),
      removeAllDice: jest.fn(),
      clearDicePool: jest.fn(),
      setRecentlyAddedDie: jest.fn(),
      clearRecentlyAddedDie: jest.fn(),
      incrementDieQuantity: jest.fn(),
      decrementDieQuantity: jest.fn(),
      setRollResult: jest.fn(),
      rollDice: jest.fn(),
      rollDiceFromSaved: jest.fn(),

      // SavedRollsSlice state
      savedRolls: jest.fn().mockReturnValue({
        rolls: [],
        isLoading: false
      }),
      // SavedRollsSlice actions
      setSavedRolls: jest.fn(),
      addSavedRoll: jest.fn(),
      removeSavedRoll: jest.fn(),
      setSavedRollsLoading: jest.fn(),

      // ModalsSlice state
      modals: jest.fn().mockReturnValue({
        showRollResults: false,
        showRollDetails: false,
        showDiceDetails: false,
        showNotationInput: false,
        selectedDieId: null
      }),
      // ModalsSlice actions
      openRollResults: jest.fn(),
      closeRollResults: jest.fn(),
      openRollDetails: jest.fn(),
      closeRollDetails: jest.fn(),
      openDiceDetails: jest.fn(),
      closeDiceDetails: jest.fn(),
      openNotationInput: jest.fn(),
      closeNotationInput: jest.fn()
    }
  },
  createSavedRoll: jest.fn()
}))
