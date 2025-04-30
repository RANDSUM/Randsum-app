import { NumericRollResult } from '@randsum/dice'
import { screen } from '@testing-library/react-native'

import { RollDetailsModal } from '@/components/organisms'
import { useDicePoolState, useLastRollState } from '@/store'
import { appRender } from '@/test/appRender'

describe('<RollDetailsModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
      name: 'Critical Hit'
    })

    jest.mocked(useLastRollState.use.showRollResults).mockReturnValue(false)
    jest.mocked(useLastRollState.use.showRollDetails).mockReturnValue(true)
    jest.mocked(useDicePoolState.use.showDiceDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showNotationInput).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.selectedDieId).mockReturnValue(null)

    appRender(<RollDetailsModal />)

    expect(screen.getByText('Critical Hit')).toBeTruthy()

    expect(screen.getByText('1D20')).toBeTruthy()
  })

  test('displays only dice notation when roll source is standard', () => {
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
        { id: 'die_1', sides: 6, quantity: 3, type: 'standard' }
      ])
    jest.mocked(useLastRollState.use.rollResult).mockReturnValue(mockRollResult)
    jest.mocked(useLastRollState.use.rollSource).mockReturnValue({
      type: 'standard'
    })

    jest.mocked(useLastRollState.use.showRollResults).mockReturnValue(false)
    jest.mocked(useLastRollState.use.showRollDetails).mockReturnValue(true)
    jest.mocked(useDicePoolState.use.showDiceDetails).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.showNotationInput).mockReturnValue(false)
    jest.mocked(useDicePoolState.use.selectedDieId).mockReturnValue(null)

    appRender(<RollDetailsModal />)

    expect(screen.queryByText('Critical Hit')).toBeNull()

    expect(screen.getByText('3D6')).toBeTruthy()
  })
})
