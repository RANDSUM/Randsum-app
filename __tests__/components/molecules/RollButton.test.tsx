import { screen, userEvent } from '@testing-library/react-native'

import { RollButton } from '@/components/molecules'
import { useLastRollState } from '@/store'
import { appRender } from '@/test/appRender'
import { PoolDie } from '@/types/dice'

describe('<RollButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the Roll button', () => {
    appRender(<RollButton />)
    expect(screen.getByText('Roll')).toBeTruthy()
  })

  test('is disabled when dice pool is empty', () => {
    jest.mocked(useLastRollState.use.dicePool).mockReturnValue([])

    const { getByText } = appRender(<RollButton />)
    expect(getByText('Roll')).toBeTruthy()
  })

  test('is enabled when dice pool has items', () => {
    const mockDicePool: PoolDie[] = [
      {
        id: 'rumi_1',
        sides: 20,
        quantity: 1,
        type: 'standard'
      }
    ]

    jest.mocked(useLastRollState.use.dicePool).mockReturnValue(mockDicePool)

    const { getByText } = appRender(<RollButton />)
    expect(getByText('Roll')).toBeTruthy()
  })

  test('calls rollDice when pressed', async () => {
    const mockRollDice = jest.fn()
    jest.mocked(useLastRollState.use.rollDice).mockReturnValue(mockRollDice)

    const mockDicePool: PoolDie[] = [
      {
        id: 'megamind_1',
        sides: 12,
        quantity: 2,
        type: 'standard'
      }
    ]

    jest.mocked(useLastRollState.use.dicePool).mockReturnValue(mockDicePool)

    const user = userEvent.setup()
    appRender(<RollButton />)

    await user.press(screen.getByText('Roll'))
    expect(mockRollDice).toHaveBeenCalledTimes(1)
  })
})
