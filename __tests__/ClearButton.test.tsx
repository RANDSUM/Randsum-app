import ClearButton from '@/components/ClearButton'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { fireEvent, screen } from '@testing-library/react-native'

describe('<ClearButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the Clear button', () => {
    appRender(<ClearButton />)

    const clearButton = screen.getByText('Clear')

    expect(clearButton).toBeTruthy()
  })

  test('button is disabled when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<ClearButton />)

    const clearButton = screen.getByText('Clear')

    expect(clearButton).toBeDisabled()
  })

  test('button is enabled when dice pool has items', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [
        { id: 'jack_kirby_1', sides: 20, quantity: 1, _type: 'numeric' }
      ],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<ClearButton />)

    const clearButton = screen.getByText('Clear')

    expect(clearButton).not.toBeDisabled()
  })

  test('shows confirmation dialog when pressed', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'rumi_1', sides: 20, quantity: 1, _type: 'numeric' }],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<ClearButton />)

    const clearButton = screen.getByText('Clear')
    fireEvent.press(clearButton)

    const dialogTitle = screen.getByText('Clear Dice Pool?')
    const dialogContent = screen.getByText(
      'Are you sure you want to clear all dice from the pool?'
    )

    expect(dialogTitle).toBeTruthy()
    expect(dialogContent).toBeTruthy()
  })

  test('calls clearDicePool when confirmed', () => {
    const mockClearDicePool = jest.fn()
    jest.mocked(Store.use.clearDicePool).mockReturnValue(mockClearDicePool)

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'mollie_1', sides: 12, quantity: 2, _type: 'numeric' }],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<ClearButton />)

    const clearButton = screen.getByText('Clear')
    fireEvent.press(clearButton)

    const confirmButton = screen.getAllByText('Clear')[1]
    fireEvent.press(confirmButton)

    expect(mockClearDicePool).toHaveBeenCalledTimes(1)
  })

  test('does not call clearDicePool when canceled', () => {
    const mockClearDicePool = jest.fn()
    jest.mocked(Store.use.clearDicePool).mockReturnValue(mockClearDicePool)

    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'megamind_1', sides: 8, quantity: 3, _type: 'numeric' }],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<ClearButton />)

    const clearButton = screen.getByText('Clear')
    fireEvent.press(clearButton)

    const cancelButton = screen.getByText('Cancel')
    fireEvent.press(cancelButton)

    expect(mockClearDicePool).not.toHaveBeenCalled()
  })
})
