import { screen, userEvent } from '@testing-library/react-native'

import Index from '@/app/(tabs)/index'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { PoolDie } from '@/types/dice'

const elements = {
  rollButton: () => screen.getByText('Roll'),
  d4Button: () => screen.getByText('D4'),
  d6Button: () => screen.getByText('D6'),
  d8Button: () => screen.getByText('D8'),
  d10Button: () => screen.getByText('D10'),
  d12Button: () => screen.getByText('D12'),
  d20Button: () => screen.getByText('D20'),
  saveButton: () => screen.getByText('Save'),
  notationButton: () => screen.getByText('Notation'),
  clearButton: () => screen.getByText('Clear'),
  emptyPoolText: () => screen.getByText('Select dice to add to your pool')
}

describe('<Index />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders the Roll button', () => {
    appRender(<Index />)
    expect(elements.rollButton()).toBeTruthy()
  })

  test('renders all dice buttons', () => {
    appRender(<Index />)

    expect(elements.d4Button()).toBeTruthy()
    expect(elements.d6Button()).toBeTruthy()
    expect(elements.d8Button()).toBeTruthy()
    expect(elements.d10Button()).toBeTruthy()
    expect(elements.d12Button()).toBeTruthy()
    expect(elements.d20Button()).toBeTruthy()
  })

  test('renders utility buttons', () => {
    appRender(<Index />)

    expect(elements.saveButton()).toBeTruthy()
    expect(elements.notationButton()).toBeTruthy()
    expect(elements.clearButton()).toBeTruthy()
  })

  test('roll button is disabled when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<Index />)

    expect(elements.rollButton()).toBeDisabled()
  })

  test('roll button is enabled when dice pool has items', () => {
    const mockDicePool: PoolDie[] = [
      {
        id: 'rumi_1',
        sides: 20,
        quantity: 1,
        type: 'standard'
      }
    ]

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: mockDicePool,
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<Index />)

    const rollButton = screen.getByText('Roll')
    expect(rollButton.props.disabled).toBeFalsy()
  })

  test('shows empty pool message when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<Index />)

    expect(elements.emptyPoolText()).toBeTruthy()
  })

  test('adds die to pool when dice button is pressed', async () => {
    const mockAddDie = jest.fn()
    jest.mocked(Store.use.addDie).mockReturnValue(mockAddDie)

    const user = userEvent.setup()
    appRender(<Index />)

    await user.press(elements.d20Button())

    expect(mockAddDie).toHaveBeenCalledWith(20)
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

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: mockDicePool,
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

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
