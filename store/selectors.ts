import { PoolDie } from '@/types/dice'
import { NumericRollResult } from '@randsum/dice'
import { StoreApi, UseBoundStore } from 'zustand'
import { CurrentRollState } from './slices/diceSlice'
import { SavedRollsState } from './slices/savedRollsSlice'
import { StoreState } from './types'

/**
 * Type helper for creating a store with selectors
 * Extends the store with a `use` property containing auto-generated selectors
 */
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & {
      use: {
        [K in keyof T]: () => T[K]
      } & {
        // Granular selectors for currentRoll
        dicePool: () => PoolDie[]
        rollResult: () => NumericRollResult | null
        recentlyAddedDie: () => string | null
        rollSource: () => CurrentRollState['rollSource']

        // Granular selectors for modals
        showRollResults: () => boolean
        showRollDetails: () => boolean
        showDiceDetails: () => boolean
        showNotationInput: () => boolean
        selectedDieId: () => string | null

        // Granular selectors for savedRolls
        savedRollsList: () => SavedRollsState['rolls']
        isSavedRollsLoading: () => boolean
      }
    }
  : never

/**
 * Creates type-safe selectors for a Zustand store with memoization
 * This allows for better type inference, autocompletion, and performance when accessing store values
 *
 * @param _store The Zustand store to create selectors for
 * @returns The original store enhanced with auto-generated selectors
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<StoreState>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>
  // Add granular selectors for currentRoll
  store.use.dicePool = () => store((s) => s.currentRoll.dicePool)
  store.use.rollResult = () => store((s) => s.currentRoll.rollResult)
  store.use.recentlyAddedDie = () =>
    store((s) => s.currentRoll.recentlyAddedDie)
  store.use.rollSource = () => store((s) => s.currentRoll.rollSource)

  // Add granular selectors for modals
  store.use.showRollResults = () => store((s) => s.modals.showRollResults)
  store.use.showRollDetails = () => store((s) => s.modals.showRollDetails)
  store.use.showDiceDetails = () => store((s) => s.modals.showDiceDetails)
  store.use.showNotationInput = () => store((s) => s.modals.showNotationInput)
  store.use.selectedDieId = () => store((s) => s.modals.selectedDieId)

  // Add granular selectors for savedRolls
  store.use.savedRollsList = () => store((s) => s.savedRolls.rolls)
  store.use.isSavedRollsLoading = () => store((s) => s.savedRolls.isLoading)

  return store
}
