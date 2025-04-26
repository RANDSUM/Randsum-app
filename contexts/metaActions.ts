import { Actions, AppAction } from '@/contexts/actions'
import { AppState } from '@/contexts/reducer'
import { PoolDie, StandardPoolDie } from '@/types/dice'
import { createNotationDie, createStandardDie } from '@/utils/diceFactory'
import { HapticService } from '@/utils/haptics'
import {
  DiceNotation,
  NumericRollOptions,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { validateNotation } from '@randsum/notation'

type ContextInfo = {
  dispatch: React.Dispatch<AppAction>
  state: AppState
}
export class MetaActions {
  static addDie(
    { dispatch, state }: ContextInfo,
    sides: number,
    quantity: number = 1
  ) {
    HapticService.light()
    const existingDieIndex = state.currentRoll.dicePool.findIndex(
      (die: PoolDie) => die._type === 'numeric' && die.sides === sides
    )

    if (existingDieIndex >= 0) {
      dispatch(Actions.incrementDieQuantity(existingDieIndex, quantity))
      dispatch(
        Actions.setRecentlyAddedDie(
          state.currentRoll.dicePool[existingDieIndex].id
        )
      )
    } else {
      const newDie = createStandardDie(sides, quantity)
      dispatch(Actions.addDieToPool(newDie))
      dispatch(Actions.setRecentlyAddedDie(newDie.id))
    }
  }

  static addNotationDie({ dispatch, state }: ContextInfo, notation: string) {
    HapticService.light()
    const validationResult = validateNotation(notation)
    if (!validationResult.valid) return

    const formattedNotation = notation.replace(
      /d(\d+|\{)/gi,
      'D$1'
    ) as DiceNotation

    const {
      modifiers,
      quantity = 1,
      sides
    } = validationResult.digested as NumericRollOptions

    if (!(Object.keys(modifiers || {}).length > 0)) {
      MetaActions.addDie({ dispatch, state }, sides, quantity)
      return
    }

    const newDie = createNotationDie(formattedNotation)
    dispatch(Actions.addDieToPool(newDie))
    dispatch(Actions.setRecentlyAddedDie(newDie.id))
  }

  static removeDie({ dispatch, state }: ContextInfo, id: string) {
    HapticService.medium()
    const dieIndex = state.currentRoll.dicePool.findIndex(
      (die: PoolDie) => die.id === id
    )

    if (dieIndex >= 0) {
      const dieToUpdate = state.currentRoll.dicePool[dieIndex]

      if (dieToUpdate._type === 'numeric' && dieToUpdate.quantity > 1) {
        dispatch(Actions.decrementDieQuantity(dieIndex))
      } else {
        dispatch(Actions.removeDieFromPool(id))
      }
    }
  }
  static roll(
    { dispatch }: ContextInfo,
    diceToRoll: (StandardPoolDie | DiceNotation)[]
  ) {
    const result = roll(...diceToRoll) as NumericRollResult

    dispatch(Actions.setRollResult(result))
    dispatch(Actions.openRollResults())
  }

  static rollDice({ state, dispatch }: ContextInfo) {
    if (state.currentRoll.dicePool.length === 0) return

    const diceToRoll = state.currentRoll.dicePool.map((die: PoolDie) =>
      die._type === 'notation' ? die.sides.notation : die
    )
    return MetaActions.roll({ dispatch, state }, diceToRoll)
  }

  static rollDiceFromSaved(
    { state, dispatch }: ContextInfo,
    savedDicePool: PoolDie[]
  ) {
    if (savedDicePool.length === 0) return

    const diceToRoll = savedDicePool.map((die: PoolDie) =>
      die._type === 'notation' ? die.sides.notation : die
    )
    return MetaActions.roll({ dispatch, state }, diceToRoll)
  }
}
