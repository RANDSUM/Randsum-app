import { NumericRollResult } from '@randsum/dice'
import { screen, userEvent } from '@testing-library/react-native'

import { RollResultsModal } from '@/components/organisms'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'

describe('<RollResultsModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders with roll result', () => {
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

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 20, quantity: 1, type: 'standard' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    appRender(<RollResultsModal />)

    expect(screen.getByText('15')).toBeTruthy()
    expect(screen.getByText('1D20')).toBeTruthy()
    expect(screen.getByText('Show Details')).toBeTruthy()
    expect(screen.getByText('Roll Results')).toBeTruthy()
  })

  test('calls openRollDetails when Show Details button is pressed', async () => {
    const mockOpenRollDetails = jest.fn()
    jest.mocked(Store.use.openRollDetails).mockReturnValue(mockOpenRollDetails)

    const mockCloseRollResults = jest.fn()
    jest
      .mocked(Store.use.closeRollResults)
      .mockReturnValue(mockCloseRollResults)

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

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 20, quantity: 1, type: 'standard' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    const user = userEvent.setup()
    appRender(<RollResultsModal />)

    await user.press(screen.getByText('Show Details'))

    expect(mockCloseRollResults).toHaveBeenCalledTimes(1)
    expect(mockOpenRollDetails).toHaveBeenCalledTimes(1)
  })

  test('renders nothing when rollResult is null', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    const { queryByText } = appRender(<RollResultsModal />)

    expect(queryByText('Roll Results')).toBeNull()
    expect(queryByText('Show Details')).toBeNull()
  })

  test('displays saved roll name when roll source is from saved roll', () => {
    const mockRollResult = {
      total: 18,
      dicePools: {
        die_1: {
          argument: '1d20',
          options: { sides: 20, quantity: 1 },
          notation: '1d20',
          description: ['Roll 1 twenty-sided die']
        }
      },
      rawRolls: {
        die_1: [18]
      },
      modifiedRolls: {
        die_1: { rolls: [18], total: 18 }
      },
      type: 'numerical',
      rawResult: [18],
      result: [18]
    } as unknown as NumericRollResult

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 20, quantity: 1, type: 'standard' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: {
        type: 'saved',
        name: 'Fireball Damage'
      }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    appRender(<RollResultsModal />)

    expect(screen.getByText('Fireball Damage')).toBeTruthy()
    expect(screen.getByText('18')).toBeTruthy()
  })
})
