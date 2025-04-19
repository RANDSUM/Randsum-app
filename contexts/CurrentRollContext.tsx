import {
  NotationPoolDie,
  PoolDie,
  StandardPoolDie,
  sidesToLabel
} from '@/types/dice'
import {
  DiceNotation,
  NumericRollOptions,
  NumericRollResult,
  roll
} from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import { useRouter } from 'expo-router'
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
  addDie: (sides: number, quantity?: number) => void
  addNotationDie: (notation: string) => void
  removeDie: (id: string) => void
  clearPool: () => void
  rollDice: () => void
  getDiceNotation: () => string
  groupRollResults: (result: NumericRollResult) => Record<string, number[]>
  isNotationDie: (die: PoolDie) => die is NotationPoolDie
  getNotation: (die: PoolDie) => string
}

const CurrentRollContext = createContext<CurrentRollContextType | undefined>(
  undefined
)

export function CurrentRollProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  const [dicePool, setDicePool] = useState<PoolDie[]>([])
  const [rollResult, setRollResult] = useState<NumericRollResult | null>(null)
  const [recentlyAddedDie, setRecentlyAddedDie] = useState<string | null>(null)

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
    router.push('/roll-results')
  }

  function getDiceNotation(): string {
    return dicePool
      .map((die) =>
        die._type === 'notation'
          ? die.sides.notation
          : `${die.quantity}D${die.sides}`
      )
      .join('+')
  }

  function groupRollResults(result: NumericRollResult) {
    const diceLabels = dicePool.map((die) => {
      if (die._type === 'notation') {
        return die.sides.notation
      } else {
        return sidesToLabel(die.sides)
      }
    })

    const groupedResults: Record<string, number[]> = {}

    diceLabels.forEach((string) => {
      if (!groupedResults[string]) {
        groupedResults[string] = []
      }
    })

    Object.values(result.rawRolls).forEach((values, i) => {
      const string = diceLabels[i] || 'Unknown'
      if (!groupedResults[string]) {
        groupedResults[string] = []
      }
      groupedResults[string].push(...values)
    })

    return groupedResults
  }

  const contextValue: CurrentRollContextType = {
    dicePool,
    rollResult,
    recentlyAddedDie,
    addDie,
    addNotationDie,
    removeDie,
    clearPool,
    rollDice,
    getDiceNotation,
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
