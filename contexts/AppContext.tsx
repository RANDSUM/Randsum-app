import { NotationPoolDie, PoolDie, StandardPoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { HapticService } from '@/utils/haptics'
import {
  DiceNotation,
  NumericRollOptions,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { AppAction, AppState, initialState, reducer } from './reducer'

const STORAGE_KEY = 'RANDSUM_SAVED_ROLLS'

type AppContextType = {
  state: AppState
  dispatch: React.Dispatch<AppAction>

  addDie: (sides: number, quantity?: number) => void
  addNotationDie: (notation: string) => void
  removeDie: (id: string) => void
  clearPool: () => void
  rollDice: () => void
  rollDiceFromSaved: (savedDicePool: PoolDie[]) => void
  commonDiceNotation: string
  groupRollResults: (result: NumericRollResult) => {
    label: string
    total: number
    results: number[]
    rejectedRolls: number[]
  }[]
  isNotationDie: (die: PoolDie) => die is NotationPoolDie
  getNotation: (die: PoolDie) => string

  saveRoll: (name: string, dicePool: PoolDie[]) => Promise<SavedRoll>
  deleteRoll: (id: string) => Promise<void>

  openRollResults: () => void
  closeRollResults: () => void
  openRollDetails: () => void
  closeRollDetails: () => void
  openDiceDetails: (dieId: string) => void
  closeDiceDetails: () => void
  openNotationInput: () => void
  closeNotationInput: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function generateId() {
    return Math.random().toString(36).substring(2, 9)
  }

  useEffect(() => {
    async function loadSavedRolls() {
      try {
        const storedRolls = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedRolls) {
          dispatch({
            type: 'SET_SAVED_ROLLS',
            payload: JSON.parse(storedRolls)
          })
        }
      } catch (error) {
        console.error('Failed to load saved rolls:', error)
      } finally {
        dispatch({ type: 'SET_SAVED_ROLLS_LOADING', payload: false })
      }
    }

    loadSavedRolls()
  }, [])

  async function persistSavedRolls(rolls: SavedRoll[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rolls))
    } catch (error) {
      console.error('Failed to save rolls:', error)
    }
  }

  function isNotationDie(die: PoolDie): die is NotationPoolDie {
    return die._type === 'notation'
  }

  function getNotation(die: PoolDie): string {
    if (isNotationDie(die)) {
      return die.sides.notation
    }
    return ''
  }

  function animateDieAddition(dieId: string) {
    dispatch({ type: 'SET_RECENTLY_ADDED_DIE', payload: dieId })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_RECENTLY_ADDED_DIE' })
    }, 300)
  }

  function createStandardDie(
    sides: number,
    quantity: number = 1
  ): StandardPoolDie {
    return {
      id: generateId(),
      sides,
      quantity,
      _type: 'numeric'
    }
  }

  function createNotationDie(notation: DiceNotation): NotationPoolDie {
    return {
      id: generateId(),
      sides: { notation },
      quantity: 1,
      _type: 'notation'
    }
  }

  function addDie(sides: number, quantity: number = 1) {
    HapticService.light()
    const existingDieIndex = state.currentRoll.dicePool.findIndex(
      (die: PoolDie) => die._type === 'numeric' && die.sides === sides
    )

    if (existingDieIndex >= 0) {
      dispatch({
        type: 'INCREMENT_DIE_QUANTITY',
        payload: { dieIndex: existingDieIndex, quantity }
      })
      animateDieAddition(state.currentRoll.dicePool[existingDieIndex].id)
    } else {
      const newDie = createStandardDie(sides, quantity)
      dispatch({ type: 'ADD_DIE_TO_POOL', payload: newDie })
      animateDieAddition(newDie.id)
    }
  }

  function addNotationDie(notation: string) {
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
      addDie(sides, quantity)
      return
    }

    const newDie = createNotationDie(formattedNotation)
    dispatch({ type: 'ADD_DIE_TO_POOL', payload: newDie })
    animateDieAddition(newDie.id)
  }

  function removeDie(id: string) {
    HapticService.medium()
    const dieIndex = state.currentRoll.dicePool.findIndex(
      (die: PoolDie) => die.id === id
    )

    if (dieIndex >= 0) {
      const dieToUpdate = state.currentRoll.dicePool[dieIndex]

      if (dieToUpdate._type === 'numeric' && dieToUpdate.quantity > 1) {
        dispatch({
          type: 'DECREMENT_DIE_QUANTITY',
          payload: { dieIndex }
        })
      } else {
        dispatch({ type: 'REMOVE_DIE_FROM_POOL', payload: id })
      }
    }
  }

  function clearPool() {
    dispatch({ type: 'CLEAR_DICE_POOL' })
  }

  function rollDice() {
    if (state.currentRoll.dicePool.length === 0) return

    const diceToRoll = state.currentRoll.dicePool.map((die: PoolDie) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    dispatch({ type: 'SET_ROLL_RESULT', payload: result })
    openRollResults()
  }

  function rollDiceFromSaved(savedDicePool: PoolDie[]) {
    if (savedDicePool.length === 0) return

    const diceToRoll = savedDicePool.map((die: PoolDie) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    dispatch({ type: 'SET_ROLL_RESULT', payload: result })
    openRollResults()
  }

  const commonDiceNotation = state.currentRoll.dicePool
    .map((die: PoolDie) =>
      die._type === 'notation'
        ? die.sides.notation
        : `${die.quantity}D${die.sides}`
    )
    .join('+')

  function groupRollResults(result: NumericRollResult): {
    label: string
    total: number
    results: number[]
    rejectedRolls: number[]
  }[] {
    return Object.entries(result.dicePools).map(([id, pool]) => {
      const rawRolls = result.rawRolls[id]
      const modifiedRolls = result.modifiedRolls[id]

      const rollFrequencyMap = new Map<number, number>()
      const usedFrequencyMap = new Map<number, number>()

      rawRolls.forEach((roll) => {
        rollFrequencyMap.set(roll, (rollFrequencyMap.get(roll) || 0) + 1)
      })

      modifiedRolls.rolls.forEach((roll) => {
        usedFrequencyMap.set(roll, (usedFrequencyMap.get(roll) || 0) + 1)
      })

      const rejectedRolls: number[] = []
      rollFrequencyMap.forEach((count, roll) => {
        const usedCount = usedFrequencyMap.get(roll) || 0
        const rejectedCount = count - usedCount

        for (let i = 0; i < rejectedCount; i++) {
          rejectedRolls.push(roll)
        }
      })

      return {
        label: pool.notation,
        total: modifiedRolls.total,
        results: modifiedRolls.rolls,
        rejectedRolls
      }
    })
  }

  async function saveRoll(
    name: string,
    dicePool: PoolDie[]
  ): Promise<SavedRoll> {
    const newRoll: SavedRoll = {
      id: generateId(),
      name,
      dicePool,
      createdAt: Date.now()
    }

    dispatch({ type: 'ADD_SAVED_ROLL', payload: newRoll })
    await persistSavedRolls([...state.savedRolls.rolls, newRoll])
    return newRoll
  }

  async function deleteRoll(id: string): Promise<void> {
    dispatch({ type: 'REMOVE_SAVED_ROLL', payload: id })
    const updatedRolls = state.savedRolls.rolls.filter(
      (roll: SavedRoll) => roll.id !== id
    )
    await persistSavedRolls(updatedRolls)
  }

  function openRollResults() {
    dispatch({ type: 'OPEN_ROLL_RESULTS' })
  }

  function closeRollResults() {
    dispatch({ type: 'CLOSE_ROLL_RESULTS' })
  }

  function openRollDetails() {
    dispatch({ type: 'OPEN_ROLL_DETAILS' })
  }

  function closeRollDetails() {
    dispatch({ type: 'CLOSE_ROLL_DETAILS' })
  }

  function openDiceDetails(dieId: string) {
    dispatch({ type: 'OPEN_DICE_DETAILS', payload: dieId })
  }

  function closeDiceDetails() {
    dispatch({ type: 'CLOSE_DICE_DETAILS' })
  }

  function openNotationInput() {
    dispatch({ type: 'OPEN_NOTATION_INPUT' })
  }

  function closeNotationInput() {
    dispatch({ type: 'CLOSE_NOTATION_INPUT' })
  }

  const contextValue: AppContextType = {
    state,
    dispatch,
    addDie,
    addNotationDie,
    removeDie,
    clearPool,
    rollDice,
    rollDiceFromSaved,
    commonDiceNotation,
    groupRollResults,
    isNotationDie,
    getNotation,
    saveRoll,
    deleteRoll,
    openRollResults,
    closeRollResults,
    openRollDetails,
    closeRollDetails,
    openDiceDetails,
    closeDiceDetails,
    openNotationInput,
    closeNotationInput
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
export function useCurrentRoll() {
  const {
    state: { currentRoll },
    addDie,
    addNotationDie,
    removeDie,
    clearPool,
    rollDice,
    rollDiceFromSaved,
    commonDiceNotation,
    groupRollResults,
    isNotationDie,
    getNotation
  } = useAppContext()

  return {
    dicePool: currentRoll.dicePool,
    rollResult: currentRoll.rollResult,
    recentlyAddedDie: currentRoll.recentlyAddedDie,
    addDie,
    addNotationDie,
    removeDie,
    clearPool,
    rollDice,
    rollDiceFromSaved,
    commonDiceNotation,
    groupRollResults,
    isNotationDie,
    getNotation
  }
}

export function useSavedRolls() {
  const {
    state: { savedRolls },
    saveRoll,
    deleteRoll
  } = useAppContext()

  return {
    savedRolls: savedRolls.rolls,
    isLoading: savedRolls.isLoading,
    saveRoll,
    deleteRoll
  }
}

export function useModal() {
  const {
    state: { modals },
    openRollResults,
    closeRollResults,
    openRollDetails,
    closeRollDetails,
    openDiceDetails,
    closeDiceDetails,
    openNotationInput,
    closeNotationInput
  } = useAppContext()

  return {
    showRollResults: modals.showRollResults,
    showRollDetails: modals.showRollDetails,
    showDiceDetails: modals.showDiceDetails,
    showNotationInput: modals.showNotationInput,
    selectedDieId: modals.selectedDieId,
    openRollResults,
    closeRollResults,
    openRollDetails,
    closeRollDetails,
    openDiceDetails,
    closeDiceDetails,
    openNotationInput,
    closeNotationInput
  }
}
