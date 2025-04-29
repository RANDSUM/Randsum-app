import { create } from 'zustand'

import { createSelectors } from './selectors'

import { StateCreator } from 'zustand'

export type ModalsState = {
  showRollResults: boolean
  showRollDetails: boolean
  showDiceDetails: boolean
  showNotationInput: boolean
  selectedDieId: string | null
}

export type ModalsActions = {
  openRollResults: () => void
  closeRollResults: () => void
  openRollDetails: () => void
  closeRollDetails: () => void
  openDiceDetails: (id: string) => void
  closeDiceDetails: () => void
  openNotationInput: () => void
  closeNotationInput: () => void
}

export type ModalsSlice = ModalsState & ModalsActions

export const initialModalsState: ModalsState = {
  showRollResults: false,
  showRollDetails: false,
  showDiceDetails: false,
  showNotationInput: false,
  selectedDieId: null
}

export const createModalsSlice: StateCreator<
  ModalsSlice,
  [],
  [],
  ModalsSlice
> = (set) => ({
  ...initialModalsState,

  openRollResults: () => {
    set((state) => ({
      ...state,
      showRollResults: true
    }))
  },

  closeRollResults: () => {
    set((state) => ({
      ...state,
      showRollResults: false
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
  ...createModalsSlice(...a)
}))

export const useModalState = createSelectors(useModalStateBase)
