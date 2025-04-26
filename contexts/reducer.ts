import { AppAction } from '@/contexts/actions'
import { PoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { NumericRollResult } from '@randsum/dice'

export type AppState = {
  currentRoll: {
    dicePool: PoolDie[]
    rollResult: NumericRollResult | null
    recentlyAddedDie: string | null
  }
  savedRolls: {
    rolls: SavedRoll[]
    isLoading: boolean
  }
  modals: {
    showRollResults: boolean
    showRollDetails: boolean
    showDiceDetails: boolean
    showNotationInput: boolean
    selectedDieId: string | null
  }
}

export const initialState: AppState = {
  currentRoll: {
    dicePool: [],
    rollResult: null,
    recentlyAddedDie: null
  },
  savedRolls: {
    rolls: [],
    isLoading: true
  },
  modals: {
    showRollResults: false,
    showRollDetails: false,
    showDiceDetails: false,
    showNotationInput: false,
    selectedDieId: null
  }
}

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_RECENTLY_ADDED_DIE':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          recentlyAddedDie: action.payload
        }
      }
    case 'CLEAR_RECENTLY_ADDED_DIE':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          recentlyAddedDie: null
        }
      }
    case 'ADD_DIE_TO_POOL':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: [...state.currentRoll.dicePool, action.payload]
        }
      }
    case 'INCREMENT_DIE_QUANTITY':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: state.currentRoll.dicePool.map((die, index) => {
            if (index === action.payload.dieIndex && die._type === 'numeric') {
              return {
                ...die,
                quantity: die.quantity + action.payload.quantity
              }
            }
            return die
          })
        }
      }
    case 'DECREMENT_DIE_QUANTITY':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: state.currentRoll.dicePool.map((die, index) => {
            if (
              index === action.payload.dieIndex &&
              die._type === 'numeric' &&
              die.quantity > 1
            ) {
              return {
                ...die,
                quantity: die.quantity - 1
              }
            }
            return die
          })
        }
      }
    case 'REMOVE_DIE_FROM_POOL':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: state.currentRoll.dicePool.filter(
            (die) => die.id !== action.payload
          )
        }
      }
    case 'CLEAR_DICE_POOL':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: [],
          rollResult: null
        }
      }
    case 'SET_ROLL_RESULT':
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          rollResult: action.payload
        }
      }
    case 'SET_SAVED_ROLLS':
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          rolls: action.payload
        }
      }
    case 'ADD_SAVED_ROLL':
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          rolls: [...state.savedRolls.rolls, action.payload]
        }
      }
    case 'REMOVE_SAVED_ROLL':
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          rolls: state.savedRolls.rolls.filter(
            (roll) => roll.id !== action.payload
          )
        }
      }
    case 'SET_SAVED_ROLLS_LOADING':
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          isLoading: action.payload
        }
      }
    case 'OPEN_ROLL_RESULTS':
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollResults: true
        }
      }
    case 'CLOSE_ROLL_RESULTS':
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollResults: false
        }
      }
    case 'OPEN_ROLL_DETAILS':
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollResults: false,
          showRollDetails: true
        }
      }
    case 'CLOSE_ROLL_DETAILS':
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollDetails: false
        }
      }
    case 'OPEN_DICE_DETAILS':
      return {
        ...state,
        modals: {
          ...state.modals,
          selectedDieId: action.payload,
          showDiceDetails: true
        }
      }
    case 'CLOSE_DICE_DETAILS':
      return {
        ...state,
        modals: {
          ...state.modals,
          showDiceDetails: false,
          selectedDieId: null
        }
      }
    case 'OPEN_NOTATION_INPUT':
      return {
        ...state,
        modals: {
          ...state.modals,
          showNotationInput: true
        }
      }
    case 'CLOSE_NOTATION_INPUT':
      return {
        ...state,
        modals: {
          ...state.modals,
          showNotationInput: false
        }
      }
    default:
      return state
  }
}
