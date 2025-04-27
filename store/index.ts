import { PoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { generateId } from '@/utils/id'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createSelectors } from './selectors'
import { createDiceSlice } from './slices/diceSlice'
import { createModalsSlice } from './slices/modalsSlice'
import { createSavedRollsSlice } from './slices/savedRollsSlice'
import { StoreState } from './types'

const STORAGE_KEY = 'RANDSUM_APP_STATE'

const AppStoreBase = create<StoreState>()(
  persist(
    (...a) => ({
      ...createDiceSlice(...a),
      ...createSavedRollsSlice(...a),
      ...createModalsSlice(...a)
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savedRolls: { rolls: state.savedRolls.rolls }
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setSavedRollsLoading(false)
        }
      }
    }
  )
)

// Create the store with type-safe selectors
export const AppStore = createSelectors(AppStoreBase)

// Helper function to create a new saved roll
export const createSavedRoll = (
  name: string,
  dicePool: PoolDie[]
): SavedRoll => {
  return {
    id: generateId(),
    name,
    dicePool,
    createdAt: Date.now()
  }
}
