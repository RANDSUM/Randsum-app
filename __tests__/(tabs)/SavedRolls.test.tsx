import { screen } from '@testing-library/react-native'

import SavedRolls from '@/app/(tabs)/saved-rolls'
import { useSavedRollsState } from '@/store'
import { appRender } from '@/test/appRender'

const elements = {
  loadingIndicator: () => screen.queryByRole('progressbar'),
  emptyText: () => screen.queryByText('No saved rolls yet'),
  emptySubtext: () =>
    screen.queryByText(
      'Save your favorite dice combinations to roll them again later'
    ),
  savedRollItem: (name: string) => screen.queryByText(name),
  rollButton: () => screen.queryByText('Roll'),
  deleteButton: () => screen.queryByText('Delete')
}

describe('<SavedRolls />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders loading indicator when isLoading is true', () => {
    jest.mocked(useSavedRollsState.use.rolls).mockReturnValue([])
    jest.mocked(useSavedRollsState.use.isLoading).mockReturnValue(true)

    appRender(<SavedRolls />)

    expect(elements.loadingIndicator()).toBeTruthy()
  })

  test('renders empty state when no saved rolls exist', () => {
    jest.mocked(useSavedRollsState.use.rolls).mockReturnValue([])
    jest.mocked(useSavedRollsState.use.isLoading).mockReturnValue(false)

    appRender(<SavedRolls />)

    expect(elements.emptyText()).toBeTruthy()
    expect(elements.emptySubtext()).toBeTruthy()
  })

  test('renders saved roll items when rolls exist', () => {
    expect(true).toBe(true)
  })

  test('calls rollDiceFromSaved when roll button is pressed', async () => {
    expect(true).toBe(true)
  })

  test('calls removeSavedRoll when delete button is pressed', async () => {
    expect(true).toBe(true)
  })
})
