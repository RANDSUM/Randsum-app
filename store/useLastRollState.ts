import { create } from 'zustand'

import { createSelectors } from './selectors'

import { NumericRollResult, roll } from '@randsum/dice'
import { StateCreator } from 'zustand'

import { RollSource } from '@/types/dice'

export type LastRollState = {
  rollResult: NumericRollResult | undefined
  rollSource: RollSource | undefined
  showRollResult: boolean
  showRollDetails: boolean
}

export type LastRollActons = {
  setRollResult: (result: NumericRollResult) => void
  rollDice: (options: RollSource | undefined) => void
  openRollResults: () => void
  closeRollResults: () => void
  openRollDetails: () => void
  closeRollDetails: () => void
}

export type DiceSlice = LastRollState & LastRollActons

export const initialDiceState: LastRollState = {
  rollResult: undefined,
  rollSource: undefined,
  showRollResult: false,
  showRollDetails: false
}

export const createDiceSlice: StateCreator<DiceSlice, [], [], DiceSlice> = (
  set,
  get
) => {
  return {
    ...initialDiceState,

    openRollResults: () => {
      set((state) => ({
        ...state,
        showRollResult: true
      }))
    },

    closeRollResults: () => {
      set((state) => ({
        ...state,
        showRollResult: false
      }))
    },

    openRollDetails: () => {
      set((state) => ({
        ...state,
        showRollResults: false,
        showRollDetails: true
      }))
    },

    closeRollDetails: () => {
      set((state) => ({
        ...state,
        showRollDetails: false
      }))
    },

    setRollResult: (result) => {
      set((state) => ({
        ...state,
        rollResult: result
      }))
    },

    rollDice: (rollSource: RollSource | undefined) => {
      if (!rollSource) return
      const diceToRoll = rollSource.dicePool.map((die) =>
        die.type === 'notation' ? die.notation : die
      )

      const rollResult = roll(...diceToRoll) as NumericRollResult

      set((state) => ({
        ...state,
        rollResult,
        rollSource
      }))

      get().openRollResults()
    }
  }
}

const useCurrentRollStateBase = create<DiceSlice>()((...a) => ({
  ...createDiceSlice(...a)
}))

export const useLastRollState = createSelectors(useCurrentRollStateBase)
