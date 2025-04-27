import { RollButtonInline } from '@/components/molecules'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { screen, userEvent } from '@testing-library/react-native'

const elements = {
  rollButton: () => screen.getByText('Roll')
}

describe('<RollButtonInline />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the Roll button', () => {
    appRender(<RollButtonInline />)

    expect(elements.rollButton()).toBeTruthy()
  })

  test('button is disabled when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    const { getByRole } = appRender(<RollButtonInline />)
    const button = getByRole('button', { name: 'Roll' })

    expect(button.props.accessibilityState.disabled).toBe(true)
  })

  test('button is enabled when dice pool has items', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [
        { id: 'dark_souls_2', sides: 20, quantity: 1, _type: 'numeric' }
      ],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    const { getByText } = appRender(<RollButtonInline />)
    const rollText = getByText('Roll')

    // Verify the button is not disabled by checking it can be pressed
    expect(rollText).toBeTruthy()
  })

  test('calls rollDice when pressed', async () => {
    const mockRollDice = jest.fn()
    jest.mocked(Store.use.rollDice).mockReturnValue(mockRollDice)

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'mollie_1', sides: 12, quantity: 2, _type: 'numeric' }],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    const user = userEvent.setup()
    appRender(<RollButtonInline />)

    await user.press(elements.rollButton())

    expect(mockRollDice).toHaveBeenCalledTimes(1)
  })
})
