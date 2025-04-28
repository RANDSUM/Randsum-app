import {
  DiceNotation,
  NumericRollOptions,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import { StateCreator } from 'zustand'

import { StoreState } from '@/store/types'
import { PoolDie } from '@/types/dice'
import { createDie } from '@/utils/diceFactory'
import { HapticService } from '@/utils/haptics'

export type CurrentRollState = {
  dicePool: PoolDie[]
  rollResult: NumericRollResult | null
  recentlyAddedDie: string | null
  rollSource: {
    type: 'standard' | 'saved'
    name?: string
  }
}

export type DiceActions = {
  addDie: (sides: number, quantity?: number) => void
  addNotationDie: (notation: string) => void
  removeDie: (id: string) => void
  clearDicePool: () => void
  setRecentlyAddedDie: (id: string) => void
  clearRecentlyAddedDie: () => void
  incrementDieQuantity: (id: string, quantity?: number) => void
  decrementDieQuantity: (id: string) => void
  setRollResult: (result: NumericRollResult) => void
  rollDice: () => void
  rollDiceFromSaved: (savedDicePool: PoolDie[], savedRollName?: string) => void
}

export type DiceSlice = {
  currentRoll: CurrentRollState
} & DiceActions

export const initialDiceState: CurrentRollState = {
  dicePool: [],
  rollResult: null,
  recentlyAddedDie: null,
  rollSource: {
    type: 'standard'
  }
}

export const createDiceSlice: StateCreator<StoreState, [], [], DiceSlice> = (
  set,
  get
) => ({
  currentRoll: initialDiceState,

  addDie: (sides, quantity = 1) => {
    HapticService.light()
    const { dicePool } = get().currentRoll

    const existingDie = dicePool.find(
      (die) => die.type === 'standard' && die.sides === sides
    )

    if (existingDie) {
      get().incrementDieQuantity(existingDie.id, quantity)
      get().setRecentlyAddedDie(existingDie.id)
    } else {
      const newDie = createDie({
        type: 'standard',
        sides,
        quantity
      })

      set((state) => ({
        currentRoll: {
          ...state.currentRoll,
          dicePool: [...state.currentRoll.dicePool, newDie]
        }
      }))
      get().setRecentlyAddedDie(newDie.id)
    }
  },

  addNotationDie: (notation) => {
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
      get().addDie(sides, quantity)
      return
    }

    const newDie = createDie({
      type: 'notation',
      notation: formattedNotation,
      quantity: 1
    })

    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        dicePool: [...state.currentRoll.dicePool, newDie]
      }
    }))
    get().setRecentlyAddedDie(newDie.id)
  },

  removeDie: (id) => {
    HapticService.medium()
    const { dicePool } = get().currentRoll
    const dieToRemove = dicePool.find((die) => die.id === id)

    if (!dieToRemove) return

    if (dieToRemove.quantity > 1) {
      get().decrementDieQuantity(id)
    } else {
      set((state) => ({
        currentRoll: {
          ...state.currentRoll,
          dicePool: state.currentRoll.dicePool.filter((die) => die.id !== id)
        }
      }))
    }
  },

  clearDicePool: () => {
    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        dicePool: [],
        rollResult: null
      }
    }))
  },

  setRecentlyAddedDie: (id) => {
    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        recentlyAddedDie: id
      }
    }))

    setTimeout(() => {
      get().clearRecentlyAddedDie()
    }, 300)
  },

  clearRecentlyAddedDie: () => {
    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        recentlyAddedDie: null
      }
    }))
  },

  incrementDieQuantity: (id, quantity = 1) => {
    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        dicePool: state.currentRoll.dicePool.map((die) => {
          if (die.id === id) {
            return {
              ...die,
              quantity: die.quantity + quantity
            }
          }
          return die
        })
      }
    }))
  },

  decrementDieQuantity: (id) => {
    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        dicePool: state.currentRoll.dicePool.map((die) => {
          if (die.id === id && die.quantity > 1) {
            return {
              ...die,
              quantity: die.quantity - 1
            }
          }
          return die
        })
      }
    }))
  },

  setRollResult: (result) => {
    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        rollResult: result
      }
    }))
  },

  rollDice: () => {
    const { dicePool } = get().currentRoll
    if (dicePool.length === 0) return

    const diceToRoll = dicePool.map((die) =>
      die.type === 'notation' ? die.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        rollResult: result,
        rollSource: {
          type: 'standard'
        }
      }
    }))

    get().openRollResults()
  },

  rollDiceFromSaved: (savedDicePool: PoolDie[], savedRollName?: string) => {
    if (savedDicePool.length === 0) return

    const diceToRoll = savedDicePool.map((die) =>
      die.type === 'notation' ? die.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    set((state) => ({
      currentRoll: {
        ...state.currentRoll,
        rollResult: result,
        rollSource: {
          type: 'saved',
          name: savedRollName
        }
      }
    }))

    get().openRollResults()
  }
})
