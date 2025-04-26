import { SavedRoll } from '@/types/savedRolls'
import { StateCreator } from 'zustand'
import { StoreState } from '../types'

export type SavedRollsState = {
  rolls: SavedRoll[]
  isLoading: boolean
}

export type SavedRollsActions = {
  setSavedRolls: (rolls: SavedRoll[]) => void
  addSavedRoll: (roll: SavedRoll) => void
  removeSavedRoll: (id: string) => void
  setSavedRollsLoading: (isLoading: boolean) => void
}

export type SavedRollsSlice = {
  savedRolls: SavedRollsState
} & SavedRollsActions

export const initialSavedRollsState: SavedRollsState = {
  rolls: [],
  isLoading: true
}

export const createSavedRollsSlice: StateCreator<
  StoreState,
  [],
  [],
  SavedRollsSlice
> = (set) => ({
  savedRolls: initialSavedRollsState,

  setSavedRolls: (rolls) => {
    set((state) => ({
      savedRolls: {
        ...state.savedRolls,
        rolls
      }
    }))
  },

  addSavedRoll: (roll) => {
    set((state) => ({
      savedRolls: {
        ...state.savedRolls,
        rolls: [...state.savedRolls.rolls, roll]
      }
    }))
  },

  removeSavedRoll: (id) => {
    set((state) => ({
      savedRolls: {
        ...state.savedRolls,
        rolls: state.savedRolls.rolls.filter((roll) => roll.id !== id)
      }
    }))
  },

  setSavedRollsLoading: (isLoading) => {
    set((state) => ({
      savedRolls: {
        ...state.savedRolls,
        isLoading
      }
    }))
  }
})
