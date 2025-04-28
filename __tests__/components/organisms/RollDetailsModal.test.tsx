import { NumericRollResult } from '@randsum/dice'
import { screen } from '@testing-library/react-native'

import { RollDetailsModal } from '@/components/organisms'
import { Store } from '@/store'
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

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 20, quantity: 1, type: 'standard' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: {
        type: 'saved',
        name: 'Critical Hit'
      }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: false,
      showRollDetails: true,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

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

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'die_1', sides: 6, quantity: 3, type: 'standard' }],
      rollResult: mockRollResult,
      recentlyAddedDie: null,
      rollSource: {
        type: 'standard'
      }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: false,
      showRollDetails: true,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    appRender(<RollDetailsModal />)

    expect(screen.queryByText('Critical Hit')).toBeNull()

    expect(screen.getByText('3D6')).toBeTruthy()
  })
})
