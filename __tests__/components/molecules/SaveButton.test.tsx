import { SaveButton } from '@/components/molecules'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { screen, userEvent } from '@testing-library/react-native'

const elements = {
  saveButton: () => screen.getByText('Save'),
  modalTitle: () => screen.getByText('Save Roll')
}

describe('<SaveButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders the Save button', () => {
    appRender(<SaveButton />)

    expect(elements.saveButton()).toBeTruthy()
  })

  test('button is disabled when dice pool is empty', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<SaveButton />)

    expect(elements.saveButton()).toBeDisabled()
  })

  test('button is enabled when dice pool has items', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [
        { id: 'megamind_1', sides: 20, quantity: 1, type: 'standard' }
      ],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })

    appRender(<SaveButton />)

    expect(elements.saveButton()).not.toBeDisabled()
  })

  test('shows save roll modal when pressed', async () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'mollie_1', sides: 12, quantity: 2, type: 'standard' }],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: { type: 'standard' }
    })
    const user = userEvent.setup()

    const { unmount } = appRender(<SaveButton />)

    await user.press(elements.saveButton())

    expect(elements.modalTitle()).toBeTruthy()

    unmount()
  })
})
