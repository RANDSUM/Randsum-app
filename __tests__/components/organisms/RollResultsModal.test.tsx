import { NumericRollResult } from '@randsum/dice'
import { screen, userEvent } from '@testing-library/react-native'

import { RollResultsModal } from '@/components/organisms'
import { useDicePoolState, useLastRollState } from '@/store'
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

    jest
      .mocked(useLastRollState.use.dicePool)
      .mockReturnValue([
        { id: 'die_1', sides: 20, quantity: 1, type: 'standard' }
      ])
    jest.mocked(useLastRollState.use.rollResult).mockReturnValue(mockRollResult)
    jest
      .mocked(useLastRollState.use.rollSource)
      .mockReturnValue({ type: 'standard' })

    jest.mocked(useLastRollState.use.showRollResult).mockReturnValue(true)
    jest.mocked(useLastRollState.use.showRollDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showDiceDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showNotationInput).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.selectedDieId).mockReturnValue(null)

    appRender(<RollResultsModal />)

    expect(screen.getByText('15')).toBeTruthy()
    expect(screen.getByText('1D20')).toBeTruthy()
    expect(screen.getByText('Show Details')).toBeTruthy()
    expect(screen.getByText('Roll Results')).toBeTruthy()
  })

  test('calls openRollDetails when Show Details button is pressed', async () => {
    const mockOpenRollDetails = jest.fn()
    jest
      .mocked(useDicePoolState.use.openRollDetails)
      .mockReturnValue(mockOpenRollDetails)

    const mockCloseRollResults = jest.fn()
    jest
      .mocked(useLastRollState.use.closeRollResults)
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

    jest
      .mocked(useLastRollState.use.dicePool)
      .mockReturnValue([
        { id: 'die_1', sides: 20, quantity: 1, type: 'standard' }
      ])
    jest.mocked(useLastRollState.use.rollResult).mockReturnValue(mockRollResult)
    jest
      .mocked(useLastRollState.use.rollSource)
      .mockReturnValue({ type: 'standard' })

    jest.mocked(useLastRollState.use.showRollResult).mockReturnValue(true)
    jest.mocked(useLastRollState.use.showRollDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showDiceDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showNotationInput).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.selectedDieId).mockReturnValue(null)

    const user = userEvent.setup()
    appRender(<RollResultsModal />)

    await user.press(screen.getByText('Show Details'))

    expect(mockCloseRollResults).toHaveBeenCalledTimes(1)
    expect(mockOpenRollDetails).toHaveBeenCalledTimes(1)
  })

  test('renders nothing when rollResult is null', () => {
    jest.mocked(useLastRollState.use.dicePool).mockReturnValue([])
    jest.mocked(useLastRollState.use.rollResult).mockReturnValue(null)
    jest
      .mocked(useLastRollState.use.rollSource)
      .mockReturnValue({ type: 'standard' })

    jest.mocked(useLastRollState.use.showRollResult).mockReturnValue(true)
    jest.mocked(useLastRollState.use.showRollDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showDiceDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showNotationInput).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.selectedDieId).mockReturnValue(null)

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

    jest
      .mocked(useLastRollState.use.dicePool)
      .mockReturnValue([
        { id: 'die_1', sides: 20, quantity: 1, type: 'standard' }
      ])
    jest.mocked(useLastRollState.use.rollResult).mockReturnValue(mockRollResult)
    jest.mocked(useLastRollState.use.rollSource).mockReturnValue({
      type: 'saved',
      name: 'Fireball Damage'
    })

    jest.mocked(useLastRollState.use.showRollResult).mockReturnValue(true)
    jest.mocked(useLastRollState.use.showRollDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showDiceDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showNotationInput).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.selectedDieId).mockReturnValue(null)

    appRender(<RollResultsModal />)

    expect(screen.getByText('Fireball Damage')).toBeTruthy()
    expect(screen.getByText('18')).toBeTruthy()
  })
})
