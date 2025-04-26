import { PoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { createNotationDie, createStandardDie } from '@/utils/diceFactory'
import { HapticService } from '@/utils/haptics'
import { generateId } from '@/utils/id'
import {
  DiceNotation,
  NumericRollOptions,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const STORAGE_KEY = 'RANDSUM_APP_STATE'

type CurrentRollState = {
  dicePool: PoolDie[]
  rollResult: NumericRollResult | null
  recentlyAddedDie: string | null
}

type SavedRollsState = {
  rolls: SavedRoll[]
  isLoading: boolean
}

type ModalsState = {
  showRollResults: boolean
  showRollDetails: boolean
  showDiceDetails: boolean
  showNotationInput: boolean
  selectedDieId: string | null
}

type StoreState = {
  currentRoll: CurrentRollState
  savedRolls: SavedRollsState
  modals: ModalsState
}

type DiceActions = {
  addDie: (sides: number, quantity?: number) => void
  addNotationDie: (notation: string) => void
  removeDie: (id: string) => void
  clearDicePool: () => void
  setRecentlyAddedDie: (id: string) => void
  clearRecentlyAddedDie: () => void
  incrementDieQuantity: (dieIndex: number, quantity: number) => void
  decrementDieQuantity: (dieIndex: number) => void
  setRollResult: (result: NumericRollResult) => void
  rollDice: () => void
  rollDiceFromSaved: (savedDicePool: PoolDie[]) => void
}

type SavedRollsActions = {
  setSavedRolls: (rolls: SavedRoll[]) => void
  addSavedRoll: (roll: SavedRoll) => void
  removeSavedRoll: (id: string) => void
  setSavedRollsLoading: (isLoading: boolean) => void
}

type ModalsActions = {
  openRollResults: () => void
  closeRollResults: () => void
  openRollDetails: () => void
  closeRollDetails: () => void
  openDiceDetails: (id: string) => void
  closeDiceDetails: () => void
  openNotationInput: () => void
  closeNotationInput: () => void
}

type StoreActions = DiceActions & SavedRollsActions & ModalsActions

const initialState: StoreState = {
  currentRoll: {
    dicePool: [],
    rollResult: null,
    recentlyAddedDie: null
  },
  savedRolls: {
    rolls: [],
    isLoading: true
  },
  modals: {
    showRollResults: false,
    showRollDetails: false,
    showDiceDetails: false,
    showNotationInput: false,
    selectedDieId: null
  }
}

export const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Dice Actions
      addDie: (sides, quantity = 1) => {
        HapticService.light()
        const { dicePool } = get().currentRoll
        const existingDieIndex = dicePool.findIndex(
          (die: PoolDie) => die._type === 'numeric' && die.sides === sides
        )

        if (existingDieIndex >= 0) {
          get().incrementDieQuantity(existingDieIndex, quantity)
          get().setRecentlyAddedDie(dicePool[existingDieIndex].id)
        } else {
          const newDie = createStandardDie(sides, quantity)
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

        const newDie = createNotationDie(formattedNotation)
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
        const dieIndex = dicePool.findIndex((die: PoolDie) => die.id === id)

        if (dieIndex >= 0) {
          const dieToUpdate = dicePool[dieIndex]

          if (dieToUpdate._type === 'numeric' && dieToUpdate.quantity > 1) {
            get().decrementDieQuantity(dieIndex)
          } else {
            set((state) => ({
              currentRoll: {
                ...state.currentRoll,
                dicePool: state.currentRoll.dicePool.filter(
                  (die) => die.id !== id
                )
              }
            }))
          }
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

        // Clear the recently added die after a delay
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

      incrementDieQuantity: (dieIndex, quantity) => {
        set((state) => ({
          currentRoll: {
            ...state.currentRoll,
            dicePool: state.currentRoll.dicePool.map((die, index) => {
              if (index === dieIndex && die._type === 'numeric') {
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

      decrementDieQuantity: (dieIndex) => {
        set((state) => ({
          currentRoll: {
            ...state.currentRoll,
            dicePool: state.currentRoll.dicePool.map((die, index) => {
              if (
                index === dieIndex &&
                die._type === 'numeric' &&
                die.quantity > 1
              ) {
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

        const diceToRoll = dicePool.map((die: PoolDie) =>
          die._type === 'notation' ? die.sides.notation : die
        )

        const result = roll(...diceToRoll) as NumericRollResult
        get().setRollResult(result)
        get().openRollResults()
      },

      rollDiceFromSaved: (savedDicePool) => {
        if (savedDicePool.length === 0) return

        const diceToRoll = savedDicePool.map((die: PoolDie) =>
          die._type === 'notation' ? die.sides.notation : die
        )

        const result = roll(...diceToRoll) as NumericRollResult
        get().setRollResult(result)
        get().openRollResults()
      },

      // Saved Rolls Actions
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
      },

      // Modal Actions
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
