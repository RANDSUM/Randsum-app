import { Actions, AppAction } from '@/contexts/actions'
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
import { AppState, initialState, reducer } from './reducer'

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
          dispatch(Actions.setSavedRolls(JSON.parse(storedRolls)))
        }
      } catch (error) {
        console.error('Failed to load saved rolls:', error)
      } finally {
        dispatch(Actions.setSavedRollsLoading(false))
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
    dispatch(Actions.setRecentlyAddedDie(dieId))

    setTimeout(() => {
      dispatch(Actions.clearRecentlyAddedDie())
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
      dispatch(Actions.incrementDieQuantity(existingDieIndex, quantity))
      animateDieAddition(state.currentRoll.dicePool[existingDieIndex].id)
    } else {
      const newDie = createStandardDie(sides, quantity)
      dispatch(Actions.addDieToPool(newDie))
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
    dispatch(Actions.addDieToPool(newDie))
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
        dispatch(Actions.decrementDieQuantity(dieIndex))
      } else {
        dispatch(Actions.removeDieFromPool(id))
      }
    }
  }

  function clearPool() {
    dispatch(Actions.clearDicePool())
  }

  function rollDice() {
    if (state.currentRoll.dicePool.length === 0) return

    const diceToRoll = state.currentRoll.dicePool.map((die: PoolDie) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    dispatch(Actions.setRollResult(result))
    openRollResults()
  }

  function rollDiceFromSaved(savedDicePool: PoolDie[]) {
    if (savedDicePool.length === 0) return

    const diceToRoll = savedDicePool.map((die: PoolDie) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    dispatch(Actions.setRollResult(result))
    openRollResults()
  }

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

    dispatch(Actions.addSavedRoll(newRoll))
    await persistSavedRolls([...state.savedRolls.rolls, newRoll])
    return newRoll
  }

  async function deleteRoll(id: string): Promise<void> {
    dispatch(Actions.removeSavedRoll(id))
    const updatedRolls = state.savedRolls.rolls.filter(
      (roll: SavedRoll) => roll.id !== id
    )
    await persistSavedRolls(updatedRolls)
  }

  function openRollResults() {
    dispatch(Actions.openRollResults())
  }

  function closeRollResults() {
    dispatch(Actions.closeRollResults())
  }

  function openRollDetails() {
    dispatch(Actions.openRollDetails())
  }

  function closeRollDetails() {
    dispatch(Actions.closeRollDetails())
  }

  function openDiceDetails(dieId: string) {
    dispatch(Actions.openDiceDetails(dieId))
  }

  function closeDiceDetails() {
    dispatch(Actions.closeDiceDetails())
  }

  function openNotationInput() {
    dispatch(Actions.openNotationInput())
  }

  function closeNotationInput() {
    dispatch(Actions.closeNotationInput())
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
