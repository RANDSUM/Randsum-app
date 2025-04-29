jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  isLoaded: jest.fn(() => true)
}))

jest.mock('@/store', () => ({
  Store: {
    use: {
      // Original top-level selectors for backward compatibility
      currentRoll: jest.fn().mockReturnValue({
        dicePool: [],
        rollResult: null,
        recentlyAddedDie: null,
        rollSource: {
          type: 'standard'
        }
      }),
      savedRolls: jest.fn().mockReturnValue({
        rolls: [],
        isLoading: false
      }),
      modals: jest.fn().mockReturnValue({
        showRollResults: false,
        showRollDetails: false,
        showDiceDetails: false,
        showNotationInput: false,
        selectedDieId: null
      }),

      // Granular selectors for currentRoll
      dicePool: jest.fn().mockReturnValue([]),
      rollResult: jest.fn().mockReturnValue(null),
      recentlyAddedDie: jest.fn().mockReturnValue(null),
      rollSource: jest.fn().mockReturnValue({ type: 'standard' }),

      // Granular selectors for modals
      showRollResults: jest.fn().mockReturnValue(false),
      showRollDetails: jest.fn().mockReturnValue(false),
      showDiceDetails: jest.fn().mockReturnValue(false),
      showNotationInput: jest.fn().mockReturnValue(false),
      selectedDieId: jest.fn().mockReturnValue(null),

      // Granular selectors for savedRolls
      savedRollsList: jest.fn().mockReturnValue([]),
      isSavedRollsLoading: jest.fn().mockReturnValue(false),

      // Actions
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
      setSavedRolls: jest.fn(),
      addSavedRoll: jest.fn(),
      removeSavedRoll: jest.fn(),
      setSavedRollsLoading: jest.fn(),
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
