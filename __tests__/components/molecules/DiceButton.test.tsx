import { DiceButton } from '@/components/molecules'
import { appRender } from '@/test/appRender'
import { screen, userEvent } from '@testing-library/react-native'

const elements = {
  button: (sides: number) => screen.getByText(`D${sides}`)
}

describe('<DiceButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders with correct label', () => {
    const sides = 20
    const mockOnPress = jest.fn()
    appRender(<DiceButton sides={sides} onPress={mockOnPress} />)

    expect(elements.button(sides)).toBeTruthy()
  })

  test('calls onPress with correct sides when pressed', async () => {
    const sides = 12
    const mockOnPress = jest.fn()
    const user = userEvent.setup()

    appRender(<DiceButton sides={sides} onPress={mockOnPress} />)

    await user.press(elements.button(sides))

    expect(mockOnPress).toHaveBeenCalledWith(sides)
  })

  test('renders with standard dice sides', () => {
    const sides = 8
    const mockOnPress = jest.fn()

    const { getByText } = appRender(
      <DiceButton sides={sides} onPress={mockOnPress} />
    )

    expect(getByText(`D${sides}`)).toBeTruthy()
  })

  test('renders with non-standard dice sides', () => {
    const sides = 100
    const mockOnPress = jest.fn()

    const { getByText } = appRender(
      <DiceButton sides={sides} onPress={mockOnPress} />
    )

    expect(getByText(`D${sides}`)).toBeTruthy()
  })
})
