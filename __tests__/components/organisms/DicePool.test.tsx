import { screen } from '@testing-library/react-native'

import { DicePool } from '@/components/organisms'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { PoolDie } from '@/types/dice'

describe('<DicePool />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('shows empty pool message when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<DicePool />)

    expect(screen.getByText('Select dice to add to your pool')).toBeTruthy()
  })

  test('renders dice pool tiles for each die in the pool', () => {
    const mockDicePool: PoolDie[] = [
      {
        id: 'rumi_1',
        sides: 20,
        quantity: 1,
        type: 'standard'
      },
      {
        id: 'mollie_2',
        sides: 6,
        quantity: 3,
        type: 'standard'
      }
    ]

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: mockDicePool,
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<DicePool />)

    expect(screen.getByText('1D20')).toBeTruthy()
    expect(screen.getByText('3D6')).toBeTruthy()
  })

  test('renders notation dice correctly', () => {
    const mockDicePool: PoolDie[] = [
      {
        id: 'jarvis_1',
        notation: '2D8+3',
        quantity: 1,
        type: 'notation'
      }
    ]

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: mockDicePool,
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<DicePool />)

    expect(screen.getByText('2D8+3')).toBeTruthy()
  })
})
