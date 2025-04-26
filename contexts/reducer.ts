import { NotationPoolDie, PoolDie, StandardPoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { DiceNotation, NumericRollResult } from '@randsum/dice'

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

export enum ActionType {
  SET_RECENTLY_ADDED_DIE = 'SET_RECENTLY_ADDED_DIE',
  CLEAR_RECENTLY_ADDED_DIE = 'CLEAR_RECENTLY_ADDED_DIE',
  ADD_DIE_TO_POOL = 'ADD_DIE_TO_POOL',
  INCREMENT_DIE_QUANTITY = 'INCREMENT_DIE_QUANTITY',
  DECREMENT_DIE_QUANTITY = 'DECREMENT_DIE_QUANTITY',
  REMOVE_DIE_FROM_POOL = 'REMOVE_DIE_FROM_POOL',
  CLEAR_DICE_POOL = 'CLEAR_DICE_POOL',
  SET_ROLL_RESULT = 'SET_ROLL_RESULT',
  SET_SAVED_ROLLS = 'SET_SAVED_ROLLS',
  ADD_SAVED_ROLL = 'ADD_SAVED_ROLL',
  REMOVE_SAVED_ROLL = 'REMOVE_SAVED_ROLL',
  SET_SAVED_ROLLS_LOADING = 'SET_SAVED_ROLLS_LOADING',
  OPEN_ROLL_RESULTS = 'OPEN_ROLL_RESULTS',
  CLOSE_ROLL_RESULTS = 'CLOSE_ROLL_RESULTS',
  OPEN_ROLL_DETAILS = 'OPEN_ROLL_DETAILS',
  CLOSE_ROLL_DETAILS = 'CLOSE_ROLL_DETAILS',
  OPEN_DICE_DETAILS = 'OPEN_DICE_DETAILS',
  CLOSE_DICE_DETAILS = 'CLOSE_DICE_DETAILS',
  OPEN_NOTATION_INPUT = 'OPEN_NOTATION_INPUT',
  CLOSE_NOTATION_INPUT = 'CLOSE_NOTATION_INPUT'
}

type SetRecentlyAddedDieAction = {
  type: ActionType.SET_RECENTLY_ADDED_DIE
  payload: string
}

type ClearRecentlyAddedDieAction = {
  type: ActionType.CLEAR_RECENTLY_ADDED_DIE
}

type AddDieToPoolAction = {
  type: ActionType.ADD_DIE_TO_POOL
  payload: PoolDie
}

type IncrementDieQuantityAction = {
  type: ActionType.INCREMENT_DIE_QUANTITY
  payload: {
    dieIndex: number
    quantity: number
  }
}

type DecrementDieQuantityAction = {
  type: ActionType.DECREMENT_DIE_QUANTITY
  payload: {
    dieIndex: number
  }
}

type RemoveDieFromPoolAction = {
  type: ActionType.REMOVE_DIE_FROM_POOL
  payload: string // die ID
}

type ClearDicePoolAction = {
  type: ActionType.CLEAR_DICE_POOL
}

type SetRollResultAction = {
  type: ActionType.SET_ROLL_RESULT
  payload: NumericRollResult
}

type SetSavedRollsAction = {
  type: ActionType.SET_SAVED_ROLLS
  payload: SavedRoll[]
}

type AddSavedRollAction = {
  type: ActionType.ADD_SAVED_ROLL
  payload: SavedRoll
}

type RemoveSavedRollAction = {
  type: ActionType.REMOVE_SAVED_ROLL
  payload: string // roll ID
}

type SetSavedRollsLoadingAction = {
  type: ActionType.SET_SAVED_ROLLS_LOADING
  payload: boolean
}

type OpenRollResultsAction = {
  type: ActionType.OPEN_ROLL_RESULTS
}

type CloseRollResultsAction = {
  type: ActionType.CLOSE_ROLL_RESULTS
}

type OpenRollDetailsAction = {
  type: ActionType.OPEN_ROLL_DETAILS
}

type CloseRollDetailsAction = {
  type: ActionType.CLOSE_ROLL_DETAILS
}

type OpenDiceDetailsAction = {
  type: ActionType.OPEN_DICE_DETAILS
  payload: string // die ID
}

type CloseDiceDetailsAction = {
  type: ActionType.CLOSE_DICE_DETAILS
}

type OpenNotationInputAction = {
  type: ActionType.OPEN_NOTATION_INPUT
}

type CloseNotationInputAction = {
  type: ActionType.CLOSE_NOTATION_INPUT
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

export const setRecentlyAddedDie = (dieId: string): SetRecentlyAddedDieAction => ({
  type: ActionType.SET_RECENTLY_ADDED_DIE,
  payload: dieId
})

export const clearRecentlyAddedDie = (): ClearRecentlyAddedDieAction => ({
  type: ActionType.CLEAR_RECENTLY_ADDED_DIE
})

export const addDieToPool = (die: PoolDie): AddDieToPoolAction => ({
  type: ActionType.ADD_DIE_TO_POOL,
  payload: die
})

export const incrementDieQuantity = (dieIndex: number, quantity: number): IncrementDieQuantityAction => ({
  type: ActionType.INCREMENT_DIE_QUANTITY,
  payload: { dieIndex, quantity }
})

export const decrementDieQuantity = (dieIndex: number): DecrementDieQuantityAction => ({
  type: ActionType.DECREMENT_DIE_QUANTITY,
  payload: { dieIndex }
})

export const removeDieFromPool = (dieId: string): RemoveDieFromPoolAction => ({
  type: ActionType.REMOVE_DIE_FROM_POOL,
  payload: dieId
})

export const clearDicePool = (): ClearDicePoolAction => ({
  type: ActionType.CLEAR_DICE_POOL
})

export const setRollResult = (result: NumericRollResult): SetRollResultAction => ({
  type: ActionType.SET_ROLL_RESULT,
  payload: result
})

export const setSavedRolls = (rolls: SavedRoll[]): SetSavedRollsAction => ({
  type: ActionType.SET_SAVED_ROLLS,
  payload: rolls
})

export const addSavedRoll = (roll: SavedRoll): AddSavedRollAction => ({
  type: ActionType.ADD_SAVED_ROLL,
  payload: roll
})

export const removeSavedRoll = (rollId: string): RemoveSavedRollAction => ({
  type: ActionType.REMOVE_SAVED_ROLL,
  payload: rollId
})

export const setSavedRollsLoading = (isLoading: boolean): SetSavedRollsLoadingAction => ({
  type: ActionType.SET_SAVED_ROLLS_LOADING,
  payload: isLoading
})

export const openRollResults = (): OpenRollResultsAction => ({
  type: ActionType.OPEN_ROLL_RESULTS
})

export const closeRollResults = (): CloseRollResultsAction => ({
  type: ActionType.CLOSE_ROLL_RESULTS
})

export const openRollDetails = (): OpenRollDetailsAction => ({
  type: ActionType.OPEN_ROLL_DETAILS
})

export const closeRollDetails = (): CloseRollDetailsAction => ({
  type: ActionType.CLOSE_ROLL_DETAILS
})

export const openDiceDetails = (dieId: string): OpenDiceDetailsAction => ({
  type: ActionType.OPEN_DICE_DETAILS,
  payload: dieId
})

export const closeDiceDetails = (): CloseDiceDetailsAction => ({
  type: ActionType.CLOSE_DICE_DETAILS
})

export const openNotationInput = (): OpenNotationInputAction => ({
  type: ActionType.OPEN_NOTATION_INPUT
})

export const closeNotationInput = (): CloseNotationInputAction => ({
  type: ActionType.CLOSE_NOTATION_INPUT
})

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionType.SET_RECENTLY_ADDED_DIE:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          recentlyAddedDie: action.payload
        }
      }
    case ActionType.CLEAR_RECENTLY_ADDED_DIE:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          recentlyAddedDie: null
        }
      }
    case ActionType.ADD_DIE_TO_POOL:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: [...state.currentRoll.dicePool, action.payload]
        }
      }
    case ActionType.INCREMENT_DIE_QUANTITY:
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
    case ActionType.DECREMENT_DIE_QUANTITY:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: state.currentRoll.dicePool.map((die, index) => {
            if (index === action.payload.dieIndex && die._type === 'numeric' && die.quantity > 1) {
              return {
                ...die,
                quantity: die.quantity - 1
              }
            }
            return die
          })
        }
      }
    case ActionType.REMOVE_DIE_FROM_POOL:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: state.currentRoll.dicePool.filter(die => die.id !== action.payload)
        }
      }
    case ActionType.CLEAR_DICE_POOL:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          dicePool: [],
          rollResult: null
        }
      }
    case ActionType.SET_ROLL_RESULT:
      return {
        ...state,
        currentRoll: {
          ...state.currentRoll,
          rollResult: action.payload
        }
      }
    case ActionType.SET_SAVED_ROLLS:
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          rolls: action.payload
        }
      }
    case ActionType.ADD_SAVED_ROLL:
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          rolls: [...state.savedRolls.rolls, action.payload]
        }
      }
    case ActionType.REMOVE_SAVED_ROLL:
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          rolls: state.savedRolls.rolls.filter(roll => roll.id !== action.payload)
        }
      }
    case ActionType.SET_SAVED_ROLLS_LOADING:
      return {
        ...state,
        savedRolls: {
          ...state.savedRolls,
          isLoading: action.payload
        }
      }
    case ActionType.OPEN_ROLL_RESULTS:
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollResults: true
        }
      }
    case ActionType.CLOSE_ROLL_RESULTS:
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollResults: false
        }
      }
    case ActionType.OPEN_ROLL_DETAILS:
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollResults: false,
          showRollDetails: true
        }
      }
    case ActionType.CLOSE_ROLL_DETAILS:
      return {
        ...state,
        modals: {
          ...state.modals,
          showRollDetails: false
        }
      }
    case ActionType.OPEN_DICE_DETAILS:
      return {
        ...state,
        modals: {
          ...state.modals,
          selectedDieId: action.payload,
          showDiceDetails: true
        }
      }
    case ActionType.CLOSE_DICE_DETAILS:
      return {
        ...state,
        modals: {
          ...state.modals,
          showDiceDetails: false,
          selectedDieId: null
        }
      }
    case ActionType.OPEN_NOTATION_INPUT:
      return {
        ...state,
        modals: {
          ...state.modals,
          showNotationInput: true
        }
      }
    case ActionType.CLOSE_NOTATION_INPUT:
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
