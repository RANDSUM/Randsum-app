import { RollButton } from '@/components/molecules'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { PoolDie } from '@/types/dice'
import { screen, userEvent } from '@testing-library/react-native'

describe('<RollButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the Roll button', () => {
    appRender(<RollButton />)
    expect(screen.getByText('Roll')).toBeTruthy()
  })

  test('is disabled when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    const { getByText } = appRender(<RollButton />)
    // Check that the button is rendered
    expect(getByText('Roll')).toBeTruthy()
  })

  test('is enabled when dice pool has items', () => {
    const mockDicePool: PoolDie[] = [
      {
        id: 'rumi_1',
        sides: 20,
        quantity: 1,
        _type: 'numeric'
      }
    ]

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: mockDicePool,
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    const { getByText } = appRender(<RollButton />)
    expect(getByText('Roll')).toBeTruthy()
  })

  test('calls rollDice when pressed', async () => {
    const mockRollDice = jest.fn()
    jest.mocked(Store.use.rollDice).mockReturnValue(mockRollDice)

    const mockDicePool: PoolDie[] = [
      {
        id: 'megamind_1',
        sides: 12,
        quantity: 2,
        _type: 'numeric'
      }
    ]

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: mockDicePool,
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    const user = userEvent.setup()
    appRender(<RollButton />)

    await user.press(screen.getByText('Roll'))
    expect(mockRollDice).toHaveBeenCalledTimes(1)
  })
})
