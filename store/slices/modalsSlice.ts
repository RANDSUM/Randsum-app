import { StateCreator } from 'zustand'
import { StoreState } from '../types'

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

export type ModalsSlice = {
  modals: ModalsState
} & ModalsActions

export const initialModalsState: ModalsState = {
  showRollResults: false,
  showRollDetails: false,
  showDiceDetails: false,
  showNotationInput: false,
  selectedDieId: null
}

export const createModalsSlice: StateCreator<
  StoreState,
  [],
  [],
  ModalsSlice
> = (set) => ({
  modals: initialModalsState,

  openRollResults: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showRollResults: true
      }
    }))
  },

  closeRollResults: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showRollResults: false
      }
    }))
  },

  openRollDetails: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showRollResults: false,
        showRollDetails: true
      }
    }))
  },

  closeRollDetails: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showRollDetails: false
      }
    }))
  },

  openDiceDetails: (id) => {
    set((state) => ({
      modals: {
        ...state.modals,
        selectedDieId: id,
        showDiceDetails: true
      }
    }))
  },

  closeDiceDetails: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showDiceDetails: false,
        selectedDieId: null
      }
    }))
  },

  openNotationInput: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showNotationInput: true
      }
    }))
  },

  closeNotationInput: () => {
    set((state) => ({
      modals: {
        ...state.modals,
        showNotationInput: false
      }
    }))
  }
})
