import { screen, userEvent } from '@testing-library/react-native'

import { SaveButton } from '@/components/molecules'
import { useAppStore } from '@/store'
import { appRender } from '@/test/appRender'

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
    jest.mocked(useAppStore.use.dicePool).mockReturnValue([])

    appRender(<SaveButton />)

    expect(elements.saveButton()).toBeDisabled()
  })

  test('button is enabled when dice pool has items', () => {
    jest
      .mocked(useAppStore.use.dicePool)
      .mockReturnValue([
        { id: 'megamind_1', sides: 20, quantity: 1, type: 'standard' }
      ])

    appRender(<SaveButton />)

    expect(elements.saveButton()).not.toBeDisabled()
  })

  test('shows save roll modal when pressed', async () => {
    jest
      .mocked(useAppStore.use.dicePool)
      .mockReturnValue([
        { id: 'mollie_1', sides: 12, quantity: 2, type: 'standard' }
      ])
    const user = userEvent.setup()

    const { unmount } = appRender(<SaveButton />)

    await user.press(elements.saveButton())

    expect(elements.modalTitle()).toBeTruthy()

    unmount()
  })
})
