import { NotationPoolDie, PoolDie, StandardPoolDie } from '@/types/dice'
import { triggerDiceAdd } from '@/utils/haptics'
import {
  DiceNotation,
  NumericRollOptions,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'

type CurrentRollContextType = {
  dicePool: PoolDie[]
  rollResult: NumericRollResult | null
  recentlyAddedDie: string | null
  showRollResults: boolean
  showRollDetails: boolean
  showDiceDetails: boolean
  showNotationInput: boolean
  selectedDieId: string | null
  addDie: (sides: number, quantity?: number) => void
  addNotationDie: (notation: string) => void
  removeDie: (id: string) => void
  clearPool: () => void
  rollDice: () => void
  rollDiceFromSaved: (savedDicePool: PoolDie[]) => void
  closeRollResults: () => void
  closeRollDetails: () => void
  showRollDetailsModal: () => void
  showDiceDetailsModal: (dieId: string) => void
  closeDiceDetails: () => void
  showNotationInputModal: () => void
  closeNotationInput: () => void
  commonDiceNotation: string
  groupRollResults: (result: NumericRollResult) => {
    label: string
    total: number
    results: number[]
    rejectedRolls: number[]
  }[]
  isNotationDie: (die: PoolDie) => die is NotationPoolDie
  getNotation: (die: PoolDie) => string
}

const CurrentRollContext = createContext<CurrentRollContextType | undefined>(
  undefined
)

export function CurrentRollProvider({ children }: PropsWithChildren) {
  const [dicePool, setDicePool] = useState<PoolDie[]>([])
  const [rollResult, setRollResult] = useState<NumericRollResult | null>(null)
  const [recentlyAddedDie, setRecentlyAddedDie] = useState<string | null>(null)
  const [showRollResults, setShowRollResults] = useState(false)
  const [showRollDetails, setShowRollDetails] = useState(false)
  const [showDiceDetails, setShowDiceDetails] = useState(false)
  const [showNotationInput, setShowNotationInput] = useState(false)
  const [selectedDieId, setSelectedDieId] = useState<string | null>(null)

  function isNotationDie(die: PoolDie): die is NotationPoolDie {
    return die._type === 'notation'
  }

  function getNotation(die: PoolDie): string {
    if (isNotationDie(die)) {
      return die.sides.notation
    }
    return ''
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 9)
  }

  function animateDieAddition(dieId: string) {
    setRecentlyAddedDie(dieId)

    setTimeout(() => {
      setRecentlyAddedDie(null)
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
    const existingDieIndex = dicePool.findIndex(
      (die) => die._type === 'numeric' && die.sides === sides
    )

    if (existingDieIndex >= 0) {
      const updatedDicePool = [...dicePool]
      const existingDie = updatedDicePool[existingDieIndex] as StandardPoolDie
      existingDie.quantity += quantity
      setDicePool(updatedDicePool)
      animateDieAddition(existingDie.id)
    } else {
      const newDie = createStandardDie(sides, quantity)
      setDicePool([...dicePool, newDie])
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

    setDicePool([...dicePool, newDie])
    animateDieAddition(newDie.id)
  }

  function removeDie(id: string) {
    const dieIndex = dicePool.findIndex((die) => die.id === id)

    if (dieIndex >= 0) {
      const updatedDicePool = [...dicePool]
      const dieToUpdate = updatedDicePool[dieIndex]

      if (dieToUpdate._type === 'numeric' && dieToUpdate.quantity > 1) {
        dieToUpdate.quantity -= 1
        setDicePool(updatedDicePool)
      } else {
        setDicePool(dicePool.filter((die) => die.id !== id))
      }
    }
  }

  function clearPool() {
    setDicePool([])
    setRollResult(null)
  }

  function rollDice() {
    if (dicePool.length === 0) return

    const diceToRoll = dicePool.map((die) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    setRollResult(result)
    setShowRollResults(true)
  }

  function rollDiceFromSaved(savedDicePool: PoolDie[]) {
    if (savedDicePool.length === 0) return

    const diceToRoll = savedDicePool.map((die) =>
      die._type === 'notation' ? die.sides.notation : die
    )

    const result = roll(...diceToRoll) as NumericRollResult

    setRollResult(result)
    setShowRollResults(true)
  }

  function closeRollResults() {
    setShowRollResults(false)
  }

  function closeRollDetails() {
    setShowRollDetails(false)
  }

  function showRollDetailsModal() {
    setShowRollResults(false)
    setShowRollDetails(true)
  }

  function showDiceDetailsModal(dieId: string) {
    setSelectedDieId(dieId)
    setShowDiceDetails(true)
  }

  function closeDiceDetails() {
    setShowDiceDetails(false)
    setSelectedDieId(null)
  }

  function showNotationInputModal() {
    setShowNotationInput(true)
  }

  function closeNotationInput() {
    setShowNotationInput(false)
  }

  const commonDiceNotation = dicePool
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

  const contextValue: CurrentRollContextType = {
    dicePool,
    rollResult,
    recentlyAddedDie,
    showRollResults,
    showRollDetails,
    showDiceDetails,
    showNotationInput,
    selectedDieId,
    addDie,
    addNotationDie,
    removeDie,
    clearPool,
    rollDice,
    rollDiceFromSaved,
    closeRollResults,
    closeRollDetails,
    showRollDetailsModal,
    showDiceDetailsModal,
    closeDiceDetails,
    showNotationInputModal,
    closeNotationInput,
    commonDiceNotation,
    groupRollResults,
    isNotationDie,
    getNotation
  }

  return (
    <CurrentRollContext.Provider value={contextValue}>
      {children}
    </CurrentRollContext.Provider>
  )
}

export function useCurrentRoll() {
  const context = useContext(CurrentRollContext)

  if (context === undefined) {
    throw new Error('useCurrentRoll must be used within a CurrentRollProvider')
  }
  return context
}
