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
      currentRoll: jest.fn().mockReturnValue({
        dicePool: [],
        rollResult: null,
        recentlyAddedDie: null,
        rollSource: {
          type: 'standard'
        }
      }),
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

      savedRolls: jest.fn().mockReturnValue({
        rolls: [],
        isLoading: false
      }),
      setSavedRolls: jest.fn(),
      addSavedRoll: jest.fn(),
      removeSavedRoll: jest.fn(),
      setSavedRollsLoading: jest.fn(),

      modals: jest.fn().mockReturnValue({
        showRollResults: false,
        showRollDetails: false,
        showDiceDetails: false,
        showNotationInput: false,
        selectedDieId: null
      }),
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
