jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  isLoaded: jest.fn(() => true)
}))

jest.mock('@/store', () => ({
  useDicePoolState: {
    use: {
      dicePool: jest.fn().mockReturnValue([]),
      recentlyAddedDie: jest.fn().mockReturnValue(null),
      showDiceDetails: jest.fn().mockReturnValue(false),
      showNotationInput: jest.fn().mockReturnValue(false),
      selectedDieId: jest.fn().mockReturnValue(null),
      addDie: jest.fn(),
      addNotationDie: jest.fn(),
      removeDie: jest.fn(),
      clearDicePool: jest.fn(),
      setRecentlyAddedDie: jest.fn(),
      clearRecentlyAddedDie: jest.fn(),
      incrementDieQuantity: jest.fn(),
      decrementDieQuantity: jest.fn(),
      openDiceDetails: jest.fn(),
      closeDiceDetails: jest.fn(),
      openNotationInput: jest.fn(),
      closeNotationInput: jest.fn(),
      rollDiceArgs: jest
        .fn()
        .mockReturnValue({ type: 'standard', dicePool: [] })
    }
  },
  useLastRollState: {
    use: {
      rollResult: jest.fn().mockReturnValue(null),
      rollSource: jest.fn().mockReturnValue({ type: 'standard' }),
      showRollResult: jest.fn().mockReturnValue(false),
      showRollDetails: jest.fn().mockReturnValue(false),
      setRollResult: jest.fn(),
      rollDice: jest.fn(),
      openRollResults: jest.fn(),
      closeRollResults: jest.fn(),
      openRollDetails: jest.fn(),
      closeRollDetails: jest.fn()
    }
  },
  useSavedRollsState: {
    use: {
      rolls: jest.fn().mockReturnValue([]),
      isLoading: jest.fn().mockReturnValue(false),
      setSavedRolls: jest.fn(),
      addSavedRoll: jest.fn(),
      removeSavedRoll: jest.fn(),
      setSavedRollsLoading: jest.fn(),
      rollDiceArgs: jest.fn().mockReturnValue({
        type: 'saved',
        name: 'Saved Roll',
        dicePool: []
      })
    }
  }
}))
