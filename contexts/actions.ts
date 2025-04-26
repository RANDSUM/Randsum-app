import { PoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { NumericRollResult } from '@randsum/dice'

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
