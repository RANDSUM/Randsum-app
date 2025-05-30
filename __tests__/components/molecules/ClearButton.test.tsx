import { screen, userEvent } from '@testing-library/react-native'

import { ClearButton } from '@/components/molecules'
import { useDicePoolState } from '@/store'
import { appRender } from '@/test/appRender'

const elements = {
  clearButton: () => screen.getByText('Clear'),
  dialogTitle: () => screen.getByText('Clear Dice Pool?'),
  cancelButton: () => screen.getByText('Cancel'),
  dialogContent: () =>
    screen.getByText('Are you sure you want to clear all dice from the pool?')
}

describe('<ClearButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders the Clear button', () => {
    appRender(<ClearButton />)

    expect(elements.clearButton()).toBeTruthy()
  })

  test('button is disabled when dice pool is empty', () => {
    jest.mocked(useDicePoolState.use.dicePool).mockReturnValue([])

    appRender(<ClearButton />)

    expect(elements.clearButton()).toBeDisabled()
  })

  test('button is enabled when dice pool has items', () => {
    jest
      .mocked(useDicePoolState.use.dicePool)
      .mockReturnValue([
        { id: 'jack_kirby_1', sides: 20, quantity: 1, type: 'standard' }
      ])

    appRender(<ClearButton />)

    expect(elements.clearButton()).not.toBeDisabled()
  })

  test('shows confirmation dialog when pressed', async () => {
    jest
      .mocked(useDicePoolState.use.dicePool)
      .mockReturnValue([
        { id: 'rumi_1', sides: 20, quantity: 1, type: 'standard' }
      ])

    appRender(<ClearButton />)

    await userEvent.press(elements.clearButton())

    expect(elements.dialogTitle()).toBeTruthy()
    expect(elements.dialogContent()).toBeTruthy()
  })

  test('calls clearDicePool when confirmed', async () => {
    const mockClearDicePool = jest.fn()
    jest
      .mocked(useDicePoolState.use.clearDicePool)
      .mockReturnValue(mockClearDicePool)

    jest
      .mocked(useDicePoolState.use.dicePool)
      .mockReturnValue([
        { id: 'mollie_1', sides: 12, quantity: 2, type: 'standard' }
      ])

    appRender(<ClearButton />)

    await userEvent.press(elements.clearButton())
    await userEvent.press(screen.getAllByText('Clear')[1])

    expect(mockClearDicePool).toHaveBeenCalledTimes(1)
  })

  test('does not call clearDicePool when canceled', async () => {
    const mockClearDicePool = jest.fn()
    jest
      .mocked(useDicePoolState.use.clearDicePool)
      .mockReturnValue(mockClearDicePool)

    jest
      .mocked(useDicePoolState.use.dicePool)
      .mockReturnValue([
        { id: 'megamind_1', sides: 8, quantity: 3, type: 'standard' }
      ])

    appRender(<ClearButton />)

    await userEvent.press(elements.clearButton())
    await userEvent.press(elements.cancelButton())

    expect(mockClearDicePool).not.toHaveBeenCalled()
  })
})
