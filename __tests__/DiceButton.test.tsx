import DiceButton from '@/components/DiceButton'
import { appRender } from '@/test/appRender'
import { HapticService } from '@/utils/haptics'
import { fireEvent, screen } from '@testing-library/react-native'

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
    const mockOnPress = jest.fn()
    appRender(<DiceButton sides={20} onPress={mockOnPress} />)

    const button = screen.getByText('D20')
    expect(button).toBeTruthy()
  })

  test('calls onPress with correct sides when pressed', () => {
    const mockOnPress = jest.fn()
    appRender(<DiceButton sides={12} onPress={mockOnPress} />)

    const button = screen.getByText('D12')
    fireEvent.press(button)

    expect(mockOnPress).toHaveBeenCalledWith(12)
  })

  test('triggers haptic feedback when pressed', () => {
    const mockOnPress = jest.fn()
    appRender(<DiceButton sides={6} onPress={mockOnPress} />)

    const button = screen.getByText('D6')
    fireEvent.press(button)

    expect(HapticService.light).toHaveBeenCalled()
  })
})
