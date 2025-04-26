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

export type ActionType =
  | 'SET_RECENTLY_ADDED_DIE'
  | 'CLEAR_RECENTLY_ADDED_DIE'
  | 'ADD_DIE_TO_POOL'
  | 'INCREMENT_DIE_QUANTITY'
  | 'DECREMENT_DIE_QUANTITY'
  | 'REMOVE_DIE_FROM_POOL'
  | 'CLEAR_DICE_POOL'
  | 'SET_ROLL_RESULT'
  | 'SET_SAVED_ROLLS'
  | 'ADD_SAVED_ROLL'
  | 'REMOVE_SAVED_ROLL'
  | 'SET_SAVED_ROLLS_LOADING'
  | 'OPEN_ROLL_RESULTS'
  | 'CLOSE_ROLL_RESULTS'
  | 'OPEN_ROLL_DETAILS'
  | 'CLOSE_ROLL_DETAILS'
  | 'OPEN_DICE_DETAILS'
  | 'CLOSE_DICE_DETAILS'
  | 'OPEN_NOTATION_INPUT'
  | 'CLOSE_NOTATION_INPUT'

type SetRecentlyAddedDieAction = {
  type: 'SET_RECENTLY_ADDED_DIE'
  payload: string
}

type ClearRecentlyAddedDieAction = {
  type: 'CLEAR_RECENTLY_ADDED_DIE'
}

type AddDieToPoolAction = {
  type: 'ADD_DIE_TO_POOL'
  payload: PoolDie
}

type IncrementDieQuantityAction = {
  type: 'INCREMENT_DIE_QUANTITY'
  payload: {
    dieIndex: number
    quantity: number
  }
}

type DecrementDieQuantityAction = {
  type: 'DECREMENT_DIE_QUANTITY'
  payload: {
    dieIndex: number
  }
}

type RemoveDieFromPoolAction = {
  type: 'REMOVE_DIE_FROM_POOL'
  payload: string
}

type ClearDicePoolAction = {
  type: 'CLEAR_DICE_POOL'
}

type SetRollResultAction = {
  type: 'SET_ROLL_RESULT'
  payload: NumericRollResult
}

type SetSavedRollsAction = {
  type: 'SET_SAVED_ROLLS'
  payload: SavedRoll[]
}

type AddSavedRollAction = {
  type: 'ADD_SAVED_ROLL'
  payload: SavedRoll
}

type RemoveSavedRollAction = {
  type: 'REMOVE_SAVED_ROLL'
  payload: string // roll ID
}

type SetSavedRollsLoadingAction = {
  type: 'SET_SAVED_ROLLS_LOADING'
  payload: boolean
}

type OpenRollResultsAction = {
  type: 'OPEN_ROLL_RESULTS'
}

type CloseRollResultsAction = {
  type: 'CLOSE_ROLL_RESULTS'
}

type OpenRollDetailsAction = {
  type: 'OPEN_ROLL_DETAILS'
}

type CloseRollDetailsAction = {
  type: 'CLOSE_ROLL_DETAILS'
}

type OpenDiceDetailsAction = {
  type: 'OPEN_DICE_DETAILS'
  payload: string // die ID
}

type CloseDiceDetailsAction = {
  type: 'CLOSE_DICE_DETAILS'
}

type OpenNotationInputAction = {
  type: 'OPEN_NOTATION_INPUT'
}

type CloseNotationInputAction = {
  type: 'CLOSE_NOTATION_INPUT'
}

export type AppAction =
  | SetRecentlyAddedDieAction
  | ClearRecentlyAddedDieAction
  | AddDieToPoolAction
  | IncrementDieQuantityAction
  | DecrementDieQuantityAction
  | RemoveDieFromPoolAction
  | ClearDicePoolAction
  | SetRollResultAction
  | SetSavedRollsAction
  | AddSavedRollAction
  | RemoveSavedRollAction
  | SetSavedRollsLoadingAction
  | OpenRollResultsAction
  | CloseRollResultsAction
  | OpenRollDetailsAction
  | CloseRollDetailsAction
  | OpenDiceDetailsAction
  | CloseDiceDetailsAction
  | OpenNotationInputAction
  | CloseNotationInputAction

export const setRecentlyAddedDie = (
  dieId: string
): SetRecentlyAddedDieAction => ({
  type: 'SET_RECENTLY_ADDED_DIE',
  payload: dieId
})

export const clearRecentlyAddedDie = (): ClearRecentlyAddedDieAction => ({
  type: 'CLEAR_RECENTLY_ADDED_DIE'
})

export const addDieToPool = (die: PoolDie): AddDieToPoolAction => ({
  type: 'ADD_DIE_TO_POOL',
  payload: die
})

export const incrementDieQuantity = (
  dieIndex: number,
  quantity: number
): IncrementDieQuantityAction => ({
  type: 'INCREMENT_DIE_QUANTITY',
  payload: { dieIndex, quantity }
})

export const decrementDieQuantity = (
  dieIndex: number
): DecrementDieQuantityAction => ({
  type: 'DECREMENT_DIE_QUANTITY',
  payload: { dieIndex }
})

export const removeDieFromPool = (dieId: string): RemoveDieFromPoolAction => ({
  type: 'REMOVE_DIE_FROM_POOL',
  payload: dieId
})

export const clearDicePool = (): ClearDicePoolAction => ({
  type: 'CLEAR_DICE_POOL'
})

export const setRollResult = (
  result: NumericRollResult
): SetRollResultAction => ({
  type: 'SET_ROLL_RESULT',
  payload: result
})

export const setSavedRolls = (rolls: SavedRoll[]): SetSavedRollsAction => ({
  type: 'SET_SAVED_ROLLS',
  payload: rolls
})

export const addSavedRoll = (roll: SavedRoll): AddSavedRollAction => ({
  type: 'ADD_SAVED_ROLL',
  payload: roll
})

export const removeSavedRoll = (rollId: string): RemoveSavedRollAction => ({
  type: 'REMOVE_SAVED_ROLL',
  payload: rollId
})

export const setSavedRollsLoading = (
  isLoading: boolean
): SetSavedRollsLoadingAction => ({
  type: 'SET_SAVED_ROLLS_LOADING',
  payload: isLoading
})

export const openRollResults = (): OpenRollResultsAction => ({
  type: 'OPEN_ROLL_RESULTS'
})

export const closeRollResults = (): CloseRollResultsAction => ({
  type: 'CLOSE_ROLL_RESULTS'
})

export const openRollDetails = (): OpenRollDetailsAction => ({
  type: 'OPEN_ROLL_DETAILS'
})

export const closeRollDetails = (): CloseRollDetailsAction => ({
  type: 'CLOSE_ROLL_DETAILS'
})

export const openDiceDetails = (dieId: string): OpenDiceDetailsAction => ({
  type: 'OPEN_DICE_DETAILS',
  payload: dieId
})

export const closeDiceDetails = (): CloseDiceDetailsAction => ({
  type: 'CLOSE_DICE_DETAILS'
})

export const openNotationInput = (): OpenNotationInputAction => ({
  type: 'OPEN_NOTATION_INPUT'
})

export const closeNotationInput = (): CloseNotationInputAction => ({
  type: 'CLOSE_NOTATION_INPUT'
})

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
