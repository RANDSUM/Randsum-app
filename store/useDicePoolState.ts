import { create } from 'zustand'

import { createSelectors } from './selectors'

import { StateCreator } from 'zustand'

export type DicePoolState = {
  showDiceDetails: boolean
  showNotationInput: boolean
  selectedDieId: string | null
}

export type DicePoolActions = {
  openDiceDetails: (id: string) => void
  closeDiceDetails: () => void
  openNotationInput: () => void
  closeNotationInput: () => void
}

export type ModalsSlice = DicePoolState & DicePoolActions

export const initialModalsState: DicePoolState = {
  showDiceDetails: false,
  showNotationInput: false,
  selectedDieId: null
}

export const createDicePoolSlice: StateCreator<
  ModalsSlice,
  [],
  [],
  ModalsSlice
> = (set) => ({
  ...initialModalsState,

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
  }
})

const useModalStateBase = create<ModalsSlice>()((...a) => ({
  ...createDicePoolSlice(...a)
}))

export const useDicePoolState = createSelectors(useModalStateBase)
