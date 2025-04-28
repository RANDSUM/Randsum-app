import Validate from '@/app/(tabs)/validate'
import { appRender } from '@/test/appRender'
import { NumericValidationResult, validateNotation } from '@randsum/notation'
import { screen, userEvent } from '@testing-library/react-native'

jest.mock('@randsum/notation', () => ({
  validateNotation: jest.fn()
}))

const elements = {
  notationInput: () => screen.getByPlaceholderText('e.g. 2D6+3 or 4D8L'),
  invalidNotationText: () => screen.queryByText('Invalid notation'),
  descriptionTitle: () => screen.queryByText('Description:'),
  descriptionText: (text: string) => screen.queryByText(text)
}

describe('<Validate />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    jest.mocked(validateNotation).mockReturnValue({
      valid: false,
      description: [],
      digested: {},
      type: 'invalid'
    })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders the notation input field', () => {
    appRender(<Validate />)

    expect(elements.notationInput()).toBeTruthy()
  })

  test('shows invalid notation message by default', () => {
    appRender(<Validate />)

    expect(elements.invalidNotationText()).toBeTruthy()
  })

  test('validates notation when text is entered', async () => {
    const mockValidationResult = {
      valid: true,
      description: ['Roll 2 six-sided dice and add 3 to the result'],
      type: 'numerical',
      notation: '2D6+3',
      digested: {
        sides: 6,
        quantity: 2,
        modifiers: { add: 3 }
      }
    } as NumericValidationResult

    jest.mocked(validateNotation).mockReturnValue(mockValidationResult)

    const user = userEvent.setup()
    appRender(<Validate />)

    const input = elements.notationInput()
    await user.type(input, '2D6+3')

    expect(validateNotation).toHaveBeenCalledWith('2D6+3')
    expect(elements.descriptionTitle()).toBeTruthy()
    expect(
      elements.descriptionText('Roll 2 six-sided dice and add 3 to the result')
    ).toBeTruthy()
  })

  test('shows invalid notation message for invalid input', async () => {
    jest.mocked(validateNotation).mockReturnValue({
      valid: false,
      description: [],
      digested: {},
      type: 'invalid'
    })

    const user = userEvent.setup()
    appRender(<Validate />)

    const input = elements.notationInput()
    await user.type(input, 'invalid')

    expect(validateNotation).toHaveBeenCalledWith('invalid')
    expect(elements.invalidNotationText()).toBeTruthy()
    expect(elements.descriptionTitle()).toBeFalsy()
  })

  test('handles complex dice notation validation', async () => {
    const mockValidationResult = {
      valid: true,
      description: ['Roll 4 eight-sided dice', 'Keep the lowest roll'],
      type: 'numerical',
      notation: '4D8L',
      digested: {
        sides: 8,
        quantity: 4,
        modifiers: { keepLowest: true }
      }
    } as NumericValidationResult

    jest.mocked(validateNotation).mockReturnValue(mockValidationResult)

    const user = userEvent.setup()
    appRender(<Validate />)

    const input = elements.notationInput()
    await user.type(input, '4D8L')

    expect(validateNotation).toHaveBeenCalledWith('4D8L')
    expect(elements.descriptionTitle()).toBeTruthy()
    expect(elements.descriptionText('Roll 4 eight-sided dice')).toBeTruthy()
    expect(elements.descriptionText('Keep the lowest roll')).toBeTruthy()
  })
})
