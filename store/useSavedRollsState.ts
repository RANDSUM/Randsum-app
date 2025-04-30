import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { RollSource } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { StateCreator } from 'zustand'
import { createSelectors } from './selectors'

const STORAGE_KEY = '@RANDSUM//SAVED_ROLLS_STATE'

export type SavedRollsState = {
  rolls: SavedRoll[]
  isLoading: boolean
}

export type SavedRollsActions = {
  setSavedRolls: (rolls: SavedRoll[]) => void
  addSavedRoll: (roll: SavedRoll) => void
  removeSavedRoll: (id: string) => void
  setSavedRollsLoading: (isLoading: boolean) => void
  rollDiceArgs: (id: string) => RollSource | undefined
}

export type SavedRollsSlice = SavedRollsState & SavedRollsActions

export const initialSavedRollsState: SavedRollsState = {
  rolls: [],
  isLoading: true
}

const createSavedRollsSlice: StateCreator<
  SavedRollsSlice,
  [],
  [],
  SavedRollsSlice
> = (set, get) => ({
  ...initialSavedRollsState,

  setSavedRolls: (rolls) => {
    set((state) => ({
      ...state,
      rolls
    }))
  },

  addSavedRoll: (roll) => {
    set((state) => ({
      ...state,
      rolls: [...state.rolls, roll]
    }))
  },

  removeSavedRoll: (id) => {
    set((state) => ({
      ...state,
      rolls: state.rolls.filter((roll) => roll.id !== id)
    }))
  },

  setSavedRollsLoading: (isLoading) => {
    set((state) => ({
      ...state,
      isLoading
    }))
  },

  rollDiceArgs: (id: string) => {
    const savedRoll = get().rolls.find((roll) => roll.id === id)
    return {
      dicePool: savedRoll?.dicePool || [],
      type: 'saved',
      name: savedRoll?.name || 'Saved Roll'
    }
  }
})

const useSavedRollsStateBase = create<SavedRollsSlice>()(
  persist(
    (...a) => ({
      ...createSavedRollsSlice(...a)
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savedRolls: state
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setSavedRollsLoading(false)
        }
      }
    }
  )
)

export const useSavedRollsState = createSelectors(useSavedRollsStateBase)
