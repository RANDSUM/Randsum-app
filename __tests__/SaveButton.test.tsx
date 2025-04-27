import SaveButton from '@/components/SaveButton'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { fireEvent, screen } from '@testing-library/react-native'

describe('<SaveButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the Save button', () => {
    appRender(<SaveButton />)

    const saveButton = screen.getByText('Save')
    expect(saveButton).toBeTruthy()
  })

  test('button is disabled when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<SaveButton />)

    const saveButton = screen.getByText('Save')
    expect(saveButton).toBeDisabled()
  })

  test('button is enabled when dice pool has items', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [
        { id: 'megamind_1', sides: 20, quantity: 1, _type: 'numeric' }
      ],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<SaveButton />)

    const saveButton = screen.getByText('Save')
    expect(saveButton).not.toBeDisabled()
  })

  test('shows save roll modal when pressed', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'mollie_1', sides: 12, quantity: 2, _type: 'numeric' }],
      rollResult: null,
      recentlyAddedDie: null
    })

    appRender(<SaveButton />)

    const saveButton = screen.getByText('Save')
    fireEvent.press(saveButton)

    // The SaveRollModal should be visible
    const modalTitle = screen.getByText('Save Roll')
    expect(modalTitle).toBeTruthy()
  })
})
