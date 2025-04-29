jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  isLoaded: jest.fn(() => true)
}))

jest.mock('@/store', () => ({
  useCurrentRollState: {
    use: {
      dicePool: jest.fn().mockReturnValue([]),
      rollResult: jest.fn().mockReturnValue(null),
      recentlyAddedDie: jest.fn().mockReturnValue(null),
      rollSource: jest.fn().mockReturnValue({ type: 'standard' }),
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
      rollDiceFromSaved: jest.fn()
    }
  },
  useModalState: {
    use: {
      showRollResults: jest.fn().mockReturnValue(false),
      showRollDetails: jest.fn().mockReturnValue(false),
      showDiceDetails: jest.fn().mockReturnValue(false),
      showNotationInput: jest.fn().mockReturnValue(false),
      selectedDieId: jest.fn().mockReturnValue(null),
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
  useSavedRollsState: {
    use: {
      savedRollsList: jest.fn().mockReturnValue([]),
      isSavedRollsLoading: jest.fn().mockReturnValue(false),
      setSavedRolls: jest.fn(),
      addSavedRoll: jest.fn(),
      removeSavedRoll: jest.fn(),
      setSavedRollsLoading: jest.fn()
    }
  },
  createSavedRoll: jest.fn()
}))
