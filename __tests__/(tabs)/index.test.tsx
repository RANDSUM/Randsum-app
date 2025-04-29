import { screen, userEvent } from '@testing-library/react-native'

import Index from '@/app/(tabs)'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { PoolDie } from '@/types/dice'

const elements = {
  d4Button: () => screen.getByText('D4'),
  d6Button: () => screen.getByText('D6'),
  d8Button: () => screen.getByText('D8'),
  d10Button: () => screen.getByText('D10'),
  d12Button: () => screen.getByText('D12'),
  d20Button: () => screen.getByText('D20'),
  notationButton: () => screen.getByText('Notation'),
  rollButton: () => screen.getByText('Roll'),
  clearButton: () => screen.getByText('Clear')
}

describe('<Index />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders the dice buttons', () => {
    appRender(<Index />)

    expect(elements.d4Button()).toBeTruthy()
    expect(elements.d6Button()).toBeTruthy()
    expect(elements.d8Button()).toBeTruthy()
    expect(elements.d10Button()).toBeTruthy()
    expect(elements.d12Button()).toBeTruthy()
    expect(elements.d20Button()).toBeTruthy()
    expect(elements.notationButton()).toBeTruthy()
  })

  test('renders the roll button', () => {
    appRender(<Index />)

    expect(elements.rollButton()).toBeTruthy()
  })

  test('renders the clear button', () => {
    appRender(<Index />)

    expect(elements.clearButton()).toBeTruthy()
  })

  test('adds die to pool when dice button is pressed', async () => {
    const mockAddDie = jest.fn()
    jest.mocked(Store.use.addDie).mockReturnValue(mockAddDie)

    const user = userEvent.setup()
    appRender(<Index />)

    await user.press(elements.d20Button())

    expect(mockAddDie).toHaveBeenCalledWith(20)
  })

  test('calls clearDicePool when clear button is pressed and confirmed', async () => {
    const mockClearDicePool = jest.fn()
    jest.mocked(Store.use.clearDicePool).mockReturnValue(mockClearDicePool)

    jest
      .mocked(Store.use.dicePool)
      .mockReturnValue([
        { id: 'rumi_1', sides: 20, quantity: 1, type: 'standard' }
      ])

    const user = userEvent.setup()
    appRender(<Index />)

    await user.press(elements.clearButton())
    await user.press(screen.getAllByText('Clear')[1])

    expect(mockClearDicePool).toHaveBeenCalledTimes(1)
  })

  test('calls rollDice when roll button is pressed', async () => {
    const mockRollDice = jest.fn()
    jest.mocked(Store.use.rollDice).mockReturnValue(mockRollDice)

    const mockDicePool: PoolDie[] = [
      {
        id: 'megamind_1',
        sides: 12,
        quantity: 2,
        type: 'standard'
      }
    ]

    jest.mocked(Store.use.dicePool).mockReturnValue(mockDicePool)

    const user = userEvent.setup()
    appRender(<Index />)

    await user.press(elements.rollButton())

    expect(mockRollDice).toHaveBeenCalledTimes(1)
  })

  test('opens notation input modal when notation button is pressed', async () => {
    const mockOpenNotationInput = jest.fn()
    jest
      .mocked(Store.use.openNotationInput)
      .mockReturnValue(mockOpenNotationInput)

    const user = userEvent.setup()
    appRender(<Index />)

    await user.press(elements.notationButton())

    expect(mockOpenNotationInput).toHaveBeenCalledTimes(1)
  })
})
