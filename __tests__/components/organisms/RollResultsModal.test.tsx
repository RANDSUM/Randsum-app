import { RollResultsModal } from '@/components/organisms'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { NumericRollResult } from '@randsum/dice'
import { screen, userEvent } from '@testing-library/react-native'

describe('<RollResultsModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders with roll result', () => {
    // Mock a roll result
    const mockRollResult = {
      total: 15,
      dicePools: {
        die_1: {
          argument: '1d20',
          options: { sides: 20, quantity: 1 },
          notation: '1d20',
          description: ['Roll 1 twenty-sided die']
        }
      },
      rawRolls: {
        die_1: [15]
      },
      modifiedRolls: {
        die_1: { rolls: [15], total: 15 }
      },
      type: 'numerical',
      rawResult: [15],
      result: [15]
    } as unknown as NumericRollResult

    // Mock the current roll
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 20, quantity: 1, _type: 'numeric' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    // Mock the modals state to show the roll results
    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    appRender(<RollResultsModal />)

    // Check that the roll result is displayed
    expect(screen.getByText('15')).toBeTruthy()
    expect(screen.getByText('1D20')).toBeTruthy()
    expect(screen.getByText('Show Details')).toBeTruthy()
  })

  test('calls openRollDetails when Show Details button is pressed', async () => {
    // Mock the openRollDetails function
    const mockOpenRollDetails = jest.fn()
    jest.mocked(Store.use.openRollDetails).mockReturnValue(mockOpenRollDetails)

    // Mock the closeRollResults function
    const mockCloseRollResults = jest.fn()
    jest
      .mocked(Store.use.closeRollResults)
      .mockReturnValue(mockCloseRollResults)

    // Mock a roll result
    const mockRollResult = {
      total: 15,
      dicePools: {
        die_1: {
          argument: '1d20',
          options: { sides: 20, quantity: 1 },
          notation: '1d20',
          description: ['Roll 1 twenty-sided die']
        }
      },
      rawRolls: {
        die_1: [15]
      },
      modifiedRolls: {
        die_1: { rolls: [15], total: 15 }
      },
      type: 'numerical',
      rawResult: [15],
      result: [15]
    } as unknown as NumericRollResult

    // Mock the current roll
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 20, quantity: 1, _type: 'numeric' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    // Mock the modals state to show the roll results
    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    const user = userEvent.setup()
    appRender(<RollResultsModal />)

    // Press the Show Details button
    await user.press(screen.getByText('Show Details'))

    // Check that the openRollDetails function was called
    expect(mockCloseRollResults).toHaveBeenCalledTimes(1)
    expect(mockOpenRollDetails).toHaveBeenCalledTimes(1)
  })

  test('renders nothing when rollResult is null', () => {
    // Mock the current roll with no roll result
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    // Mock the modals state to show the roll results
    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    const { queryByText } = appRender(<RollResultsModal />)

    // Check that no roll result is rendered
    expect(queryByText('Roll Results')).toBeNull()
    expect(queryByText('Show Details')).toBeNull()
  })
})
