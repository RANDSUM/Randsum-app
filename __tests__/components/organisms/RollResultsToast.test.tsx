import { RollResultsToast } from '@/components/organisms'
import { Store } from '@/store'
import { appRender } from '@/test/appRender'
import { NumericRollResult } from '@randsum/dice'
import { screen } from '@testing-library/react-native'

describe('<RollResultsToast />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders saved roll name when roll source is from saved roll', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'mollie_1', sides: 6, quantity: 3, type: 'standard' }],
      rollResult: { total: 12, dicePools: {} } as NumericRollResult,
      recentlyAddedDie: null,
      rollSource: {
        type: 'saved',
        name: 'Fireball Damage'
      }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    appRender(<RollResultsToast />)

    expect(screen.getByText('Fireball Damage')).toBeTruthy()
    expect(screen.getByText('12')).toBeTruthy()
  })

  test('renders nothing when rollResult is null', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [],
      rollResult: null,
      recentlyAddedDie: null,
      rollSource: {
        type: 'standard'
      }
    })

    appRender(<RollResultsToast />)

    expect(screen.queryByText('DETAILS')).toBeNull()
  })

  test('renders toast with roll result when visible', () => {
    jest.mocked(Store.use.currentRoll).mockReturnValue({
      dicePool: [{ id: 'rumi_1', sides: 20, quantity: 1, type: 'standard' }],
      rollResult: { total: 15, dicePools: {} } as NumericRollResult,
      recentlyAddedDie: null,
      rollSource: {
        type: 'standard'
      }
    })

    jest.mocked(Store.use.modals).mockReturnValue({
      showRollResults: true,
      showRollDetails: false,
      showDiceDetails: false,
      showNotationInput: false,
      selectedDieId: null
    })

    appRender(<RollResultsToast />)

    expect(screen.getByText('15')).toBeTruthy()
    expect(screen.getByText('DETAILS')).toBeTruthy()
  })
})
