import { screen, userEvent } from '@testing-library/react-native'

import { DiceButtons } from '@/components/organisms'
import { useDicePoolState, useLastRollState } from '@/store'
import { appRender } from '@/test/appRender'

const elements = {
  d4Button: () => screen.getByText('D4'),
  d6Button: () => screen.getByText('D6'),
  d8Button: () => screen.getByText('D8'),
  d10Button: () => screen.getByText('D10'),
  d12Button: () => screen.getByText('D12'),
  d20Button: () => screen.getByText('D20'),
  saveButton: () => screen.getByText('Save'),
  notationButton: () => screen.getByText('Notation'),
  clearButton: () => screen.getByText('Clear'),
  rollButton: () => screen.getByText('Roll')
}

describe('<DiceButtons />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all dice buttons', () => {
    appRender(<DiceButtons />)

    expect(elements.d4Button()).toBeTruthy()
    expect(elements.d6Button()).toBeTruthy()
    expect(elements.d8Button()).toBeTruthy()
    expect(elements.d10Button()).toBeTruthy()
    expect(elements.d12Button()).toBeTruthy()
    expect(elements.d20Button()).toBeTruthy()
  })

  test('renders utility buttons', () => {
    appRender(<DiceButtons />)

    expect(elements.saveButton()).toBeTruthy()
    expect(elements.notationButton()).toBeTruthy()
    expect(elements.clearButton()).toBeTruthy()
    expect(elements.rollButton()).toBeTruthy()
  })

  test('calls addDie when dice button is pressed', async () => {
    const mockAddDie = jest.fn()
    jest.mocked(useLastRollState.use.addDie).mockReturnValue(mockAddDie)

    const user = userEvent.setup()
    appRender(<DiceButtons />)

    await user.press(elements.d20Button())

    expect(mockAddDie).toHaveBeenCalledWith(20)
  })

  test('opens notation input modal when notation button is pressed', async () => {
    const mockOpenNotationInput = jest.fn()
    jest
      .mocked(useDicePoolState.use.openNotationInput)
      .mockReturnValue(mockOpenNotationInput)

    const user = userEvent.setup()
    appRender(<DiceButtons />)

    await user.press(elements.notationButton())

    expect(mockOpenNotationInput).toHaveBeenCalledTimes(1)
  })
})
