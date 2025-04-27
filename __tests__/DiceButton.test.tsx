import DiceButton from '@/components/DiceButton'
import { appRender } from '@/test/appRender'
import { HapticService } from '@/utils/haptics'
import { screen, userEvent } from '@testing-library/react-native'

const elements = {
  button: (sides: number) => screen.getByText(`D${sides}`)
}

jest.mock('@/utils/haptics', () => ({
  HapticService: {
    light: jest.fn()
  }
}))

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
    appRender(<DiceButton sides={sides} onPress={mockOnPress} />)

    await userEvent.press(elements.button(sides))

    expect(mockOnPress).toHaveBeenCalledWith(sides)
  })

  test('triggers haptic feedback when pressed', async () => {
    const sides = 6
    const mockOnPress = jest.fn()
    appRender(<DiceButton sides={sides} onPress={mockOnPress} />)

    await userEvent.press(elements.button(sides))

    expect(HapticService.light).toHaveBeenCalled()
  })
})
