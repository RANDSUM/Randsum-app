import { create } from 'zustand'

import { createSelectors } from './selectors'

import { PoolDie, RollSource } from '@/types/dice'
import { createDie } from '@/utils/diceFactory'
import { HapticService } from '@/utils/haptics'
import { DiceNotation, NumericRollOptions } from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import { StateCreator } from 'zustand'

export type DicePoolState = {
  dicePool: PoolDie[]
  showDiceDetails: boolean
  showNotationInput: boolean
  selectedDieId: string | null
  recentlyAddedDie: string | null
}

export type DicePoolActions = {
  openDiceDetails: (id: string) => void
  closeDiceDetails: () => void
  openNotationInput: () => void
  closeNotationInput: () => void
  addDie: (sides: number, quantity?: number) => void
  addNotationDie: (notation: string) => void
  removeDie: (id: string) => void
  clearDicePool: () => void
  setRecentlyAddedDie: (id: string) => void
  clearRecentlyAddedDie: () => void
  incrementDieQuantity: (id: string, quantity?: number) => void
  decrementDieQuantity: (id: string) => void
  rollDiceArgs: RollSource | undefined
}

export type ModalsSlice = DicePoolState & DicePoolActions

export const initialDicePoolState: DicePoolState = {
  dicePool: [],
  recentlyAddedDie: null,
  showDiceDetails: false,
  showNotationInput: false,
  selectedDieId: null
}

export const createDicePoolSlice: StateCreator<
  ModalsSlice,
  [],
  [],
  ModalsSlice
> = (set, get) => ({
  ...initialDicePoolState,

  addDie: (sides, quantity = 1) => {
    HapticService.light()
    const dicePool = get().dicePool

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
        ...state,
        dicePool: [...state.dicePool, newDie]
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
      ...state,
      dicePool: [...state.dicePool, newDie]
    }))
    get().setRecentlyAddedDie(newDie.id)
  },

  removeDie: (id) => {
    HapticService.medium()
    const dicePool = get().dicePool
    const dieToRemove = dicePool.find((die) => die.id === id)

    if (!dieToRemove) return

    if (dieToRemove.quantity > 1) {
      get().decrementDieQuantity(id)
    } else {
      set((state) => ({
        ...state,
        dicePool: state.dicePool.filter((die) => die.id !== id)
      }))
    }
  },

  clearDicePool: () => {
    set((state) => ({
      ...state,
      dicePool: [],
      rollResult: null
    }))
  },

  setRecentlyAddedDie: (id) => {
    set((state) => ({
      ...state,
      recentlyAddedDie: id
    }))

    setTimeout(() => {
      get().clearRecentlyAddedDie()
    }, 300)
  },

  clearRecentlyAddedDie: () => {
    set((state) => ({
      ...state,
      recentlyAddedDie: null
    }))
  },

  incrementDieQuantity: (id, quantity = 1) => {
    set((state) => ({
      ...state,
      dicePool: state.dicePool.map((die) => {
        if (die.id === id) {
          return {
            ...die,
            quantity: die.quantity + quantity
          }
        }
        return die
      })
    }))
  },

  decrementDieQuantity: (id) => {
    set((state) => ({
      ...state,
      dicePool: state.dicePool.map((die) => {
        if (die.id === id && die.quantity > 1) {
          return {
            ...die,
            quantity: die.quantity - 1
          }
        }
        return die
      })
    }))
  },

  openDiceDetails: (id) => {
    set((state) => ({
      ...state,
      selectedDieId: id,
      showDiceDetails: true
    }))
  },

  closeDiceDetails: () => {
    set((state) => ({
      ...state,
      showDiceDetails: false,
      selectedDieId: null
    }))
  },

  openNotationInput: () => {
    set((state) => ({
      ...state,
      showNotationInput: true
    }))
  },

  closeNotationInput: () => {
    set((state) => ({
      ...state,
      showNotationInput: false
    }))
  },

  rollDiceArgs: {
    type: 'standard',
    dicePool: get().dicePool
  }
})

const useModalStateBase = create<ModalsSlice>()((...a) => ({
  ...createDicePoolSlice(...a)
}))

export const useDicePoolState = createSelectors(useModalStateBase)
