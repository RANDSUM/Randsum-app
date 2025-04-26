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

export class Actions {
  static setRecentlyAddedDie(dieId: string): SetRecentlyAddedDieAction {
    return {
      type: 'SET_RECENTLY_ADDED_DIE',
      payload: dieId
    }
  }
  static clearRecentlyAddedDie(): ClearRecentlyAddedDieAction {
    return {
      type: 'CLEAR_RECENTLY_ADDED_DIE'
    }
  }
  static addDieToPool(die: PoolDie): AddDieToPoolAction {
    return {
      type: 'ADD_DIE_TO_POOL',
      payload: die
    }
  }
  static incrementDieQuantity(
    dieIndex: number,
    quantity: number
  ): IncrementDieQuantityAction {
    return {
      type: 'INCREMENT_DIE_QUANTITY',
      payload: { dieIndex, quantity }
    }
  }
  static decrementDieQuantity(dieIndex: number): DecrementDieQuantityAction {
    return {
      type: 'DECREMENT_DIE_QUANTITY',
      payload: { dieIndex }
    }
  }
  static removeDieFromPool(dieId: string): RemoveDieFromPoolAction {
    return {
      type: 'REMOVE_DIE_FROM_POOL',
      payload: dieId
    }
  }
  static clearDicePool(): ClearDicePoolAction {
    return {
      type: 'CLEAR_DICE_POOL'
    }
  }
  static setRollResult(result: NumericRollResult): SetRollResultAction {
    return {
      type: 'SET_ROLL_RESULT',
      payload: result
    }
  }
  static setSavedRolls(rolls: SavedRoll[]): SetSavedRollsAction {
    return {
      type: 'SET_SAVED_ROLLS',
      payload: rolls
    }
  }
  static addSavedRoll(roll: SavedRoll): AddSavedRollAction {
    return {
      type: 'ADD_SAVED_ROLL',
      payload: roll
    }
  }
  static removeSavedRoll(rollId: string): RemoveSavedRollAction {
    return {
      type: 'REMOVE_SAVED_ROLL',
      payload: rollId
    }
  }
  static setSavedRollsLoading(isLoading: boolean): SetSavedRollsLoadingAction {
    return {
      type: 'SET_SAVED_ROLLS_LOADING',
      payload: isLoading
    }
  }
  static openRollResults(): OpenRollResultsAction {
    return {
      type: 'OPEN_ROLL_RESULTS'
    }
  }
  static closeRollResults(): CloseRollResultsAction {
    return {
      type: 'CLOSE_ROLL_RESULTS'
    }
  }
  static openRollDetails(): OpenRollDetailsAction {
    return {
      type: 'OPEN_ROLL_DETAILS'
    }
  }
  static closeRollDetails(): CloseRollDetailsAction {
    return {
      type: 'CLOSE_ROLL_DETAILS'
    }
  }
  static openDiceDetails(dieId: string): OpenDiceDetailsAction {
    return {
      type: 'OPEN_DICE_DETAILS',
      payload: dieId
    }
  }
  static closeDiceDetails(): CloseDiceDetailsAction {
    return {
      type: 'CLOSE_DICE_DETAILS'
    }
  }
  static openNotationInput(): OpenNotationInputAction {
    return {
      type: 'OPEN_NOTATION_INPUT'
    }
  }
  static closeNotationInput(): CloseNotationInputAction {
    return {
      type: 'CLOSE_NOTATION_INPUT'
    }
  }
}
