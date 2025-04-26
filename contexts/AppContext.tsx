import { NotationPoolDie, PoolDie, StandardPoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { triggerDiceAdd } from '@/utils/haptics'
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
  useState
} from 'react'

const STORAGE_KEY = 'RANDSUM_SAVED_ROLLS'

type AppState = {
  currentRoll: {
    dicePool: PoolDie[]
    rollResult: NumericRollResult | null
    recentlyAddedDie: string | null
  }
  savedRolls: {
    rolls: SavedRoll[]
    isLoading: boolean
  }
  modals: {
    showRollResults: boolean
    showRollDetails: boolean
    showDiceDetails: boolean
    showNotationInput: boolean
    selectedDieId: string | null
  }
}

type AppContextType = {
  state: AppState
  setState: <K extends keyof AppState>(
    section: K,
    updater: (prevState: AppState[K]) => AppState[K]
  ) => void

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

const initialState: AppState = {
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

export function AppProvider({ children }: PropsWithChildren) {
  const [state, setStateInternal] = useState<AppState>(initialState)

  const setState = <K extends keyof AppState>(
    section: K,
    updater: (prevState: AppState[K]) => AppState[K]
  ) => {
    setStateInternal((prevState) => ({
      ...prevState,
      [section]: updater(prevState[section])
    }))
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 9)
  }

  useEffect(() => {
    loadSavedRolls()
  }, [])

  async function loadSavedRolls() {
    try {
      const storedRolls = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedRolls) {
        setState('savedRolls', (prev) => ({
          ...prev,
          rolls: JSON.parse(storedRolls)
        }))
      }
    } catch (error) {
      console.error('Failed to load saved rolls:', error)
    } finally {
      setState('savedRolls', (prev) => ({
        ...prev,
        isLoading: false
      }))
    }
  }

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
    setState('currentRoll', (prev) => ({
      ...prev,
      recentlyAddedDie: dieId
    }))

    setTimeout(() => {
      setState('currentRoll', (prev) => ({
        ...prev,
        recentlyAddedDie: null
      }))
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
    triggerDiceAdd()
    const existingDieIndex = state.currentRoll.dicePool.findIndex(
      (die) => die._type === 'numeric' && die.sides === sides
    )

    if (existingDieIndex >= 0) {
      setState('currentRoll', (prev) => {
        const updatedDicePool = [...prev.dicePool]
        const existingDie = updatedDicePool[existingDieIndex] as StandardPoolDie
        existingDie.quantity += quantity
        return {
          ...prev,
          dicePool: updatedDicePool
        }
      })
      animateDieAddition(state.currentRoll.dicePool[existingDieIndex].id)
    } else {
      const newDie = createStandardDie(sides, quantity)
      setState('currentRoll', (prev) => ({
        ...prev,
        dicePool: [...prev.dicePool, newDie]
      }))
      animateDieAddition(newDie.id)
    }
  }

  function addNotationDie(notation: string) {
    triggerDiceAdd()
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

    setState('currentRoll', (prev) => ({
      ...prev,
      dicePool: [...prev.dicePool, newDie]
    }))
    animateDieAddition(newDie.id)
  }

  function removeDie(id: string) {
    const dieIndex = state.currentRoll.dicePool.findIndex(
      (die) => die.id === id
    )

    if (dieIndex >= 0) {
      const dieToUpdate = state.currentRoll.dicePool[dieIndex]

      if (dieToUpdate._type === 'numeric' && dieToUpdate.quantity > 1) {
        setState('currentRoll', (prev) => {
          const updatedDicePool = [...prev.dicePool]
          updatedDicePool[dieIndex] = {
            ...updatedDicePool[dieIndex],
            quantity:
              (updatedDicePool[dieIndex] as StandardPoolDie).quantity - 1
          }
          return {
            ...prev,
            dicePool: updatedDicePool
          }
        })
      } else {
        setState('currentRoll', (prev) => ({
          ...prev,
          dicePool: prev.dicePool.filter((die) => die.id !== id)
        }))
      }
    }
  }

  function clearPool() {
    setState('currentRoll', (prev) => ({
      ...prev,
      dicePool: [],
      rollResult: null
    }))
  }

  function rollDice() {
    if (state.currentRoll.dicePool.length === 0) return

    const diceToRoll = state.currentRoll.dicePool.map((die) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    setState('currentRoll', (prev) => ({
      ...prev,
      rollResult: result
    }))
    openRollResults()
  }

  function rollDiceFromSaved(savedDicePool: PoolDie[]) {
    if (savedDicePool.length === 0) return

    const diceToRoll = savedDicePool.map((die) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    setState('currentRoll', (prev) => ({
      ...prev,
      rollResult: result
    }))
    openRollResults()
  }

  const commonDiceNotation = state.currentRoll.dicePool
    .map((die) =>
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

    const updatedRolls = [...state.savedRolls.rolls, newRoll]
    setState('savedRolls', (prev) => ({
      ...prev,
      rolls: updatedRolls
    }))
    await persistSavedRolls(updatedRolls)
    return newRoll
  }

  async function deleteRoll(id: string): Promise<void> {
    const updatedRolls = state.savedRolls.rolls.filter((roll) => roll.id !== id)
    setState('savedRolls', (prev) => ({
      ...prev,
      rolls: updatedRolls
    }))
    await persistSavedRolls(updatedRolls)
  }

  function openRollResults() {
    setState('modals', (prev) => ({
      ...prev,
      showRollResults: true
    }))
  }

  function closeRollResults() {
    setState('modals', (prev) => ({
      ...prev,
      showRollResults: false
    }))
  }

  function openRollDetails() {
    setState('modals', (prev) => ({
      ...prev,
      showRollResults: false,
      showRollDetails: true
    }))
  }

  function closeRollDetails() {
    setState('modals', (prev) => ({
      ...prev,
      showRollDetails: false
    }))
  }

  function openDiceDetails(dieId: string) {
    setState('modals', (prev) => ({
      ...prev,
      selectedDieId: dieId,
      showDiceDetails: true
    }))
  }

  function closeDiceDetails() {
    setState('modals', (prev) => ({
      ...prev,
      showDiceDetails: false,
      selectedDieId: null
    }))
  }

  function openNotationInput() {
    setState('modals', (prev) => ({
      ...prev,
      showNotationInput: true
    }))
  }

  function closeNotationInput() {
    setState('modals', (prev) => ({
      ...prev,
      showNotationInput: false
    }))
  }

  const contextValue: AppContextType = {
    state,
    setState,
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
