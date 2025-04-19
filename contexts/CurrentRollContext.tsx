import { DieLabel, PoolDie, labelToSides, sidesToLabel } from '@/types/dice'
import { D, NumericRollResult, roll } from '@randsum/dice'
import { useRouter } from 'expo-router'
import React, { ReactNode, createContext, useContext, useState } from 'react'

type CurrentRollContextType = {
  dicePool: PoolDie[]
  rollResult: NumericRollResult | null
  recentlyAddedDie: DieLabel | null
  diceOrder: DieLabel[]

  addDie: (dieLabel: DieLabel) => void
  removeDie: (dieLabel: DieLabel) => void
  clearPool: () => void
  rollDice: () => void
  groupDiceByType: (dice: DieLabel[]) => { type: DieLabel; count: number }[]
  getDiceNotation: (dice: DieLabel[]) => string
  groupRollResults: (result: NumericRollResult) => Record<string, number[]>
}

const CurrentRollContext = createContext<CurrentRollContextType | undefined>(
  undefined
)

type CurrentRollProviderProps = {
  children: ReactNode
}

export function CurrentRollProvider({ children }: CurrentRollProviderProps) {
  const router = useRouter()
  const [dicePool, setDicePool] = useState<PoolDie[]>([])
  const [rollResult, setRollResult] = useState<NumericRollResult | null>(null)
  const [recentlyAddedDie, setRecentlyAddedDie] = useState<DieLabel | null>(
    null
  )
  const [diceOrder, setDiceOrder] = useState<DieLabel[]>([])

  const addDie = (dieLabel: DieLabel) => {
    const sides = labelToSides[dieLabel]
    const newDie = {
      id: Math.random().toString(36).substring(2, 9),
      sides
    }
    setDicePool([...dicePool, newDie])
    setRecentlyAddedDie(dieLabel)

    // Add to dice order if not already present
    if (!diceOrder.includes(dieLabel)) {
      setDiceOrder([...diceOrder, dieLabel])
    }

    // Clear the recently added die after animation completes
    setTimeout(() => {
      setRecentlyAddedDie(null)
    }, 300)
  }

  const removeDie = (dieLabel: DieLabel) => {
    const sides = labelToSides[dieLabel]
    const dieToRemove = dicePool.find((die) => die.sides === sides)
    if (dieToRemove) {
      // Remove the die from the pool
      setDicePool(
        dicePool.filter(
          (_, index) =>
            index !== dicePool.findIndex((d) => d.id === dieToRemove.id)
        )
      )

      // Check if this was the last die of this type
      const remainingDiceOfType = dicePool.filter(
        (die) => die.sides === sides && die.id !== dieToRemove.id
      )

      // If no more dice of this type, remove from order
      if (remainingDiceOfType.length === 0) {
        setDiceOrder(diceOrder.filter((type) => type !== dieLabel))
      }
    }
  }

  const clearPool = () => {
    setDicePool([])
    setDiceOrder([])
  }

  const rollDice = () => {
    if (dicePool.length === 0) return

    const diceToRoll = dicePool.map((die) => new D(die.sides))

    const result = roll(...diceToRoll) as NumericRollResult

    setRollResult(result)
    router.push('/roll-results')
  }

  const groupDiceByType = (dice: DieLabel[]) => {
    const grouped: Record<DieLabel, number> = {
      D4: 0,
      D6: 0,
      D8: 0,
      D10: 0,
      D12: 0,
      D20: 0,
      D100: 0
    }

    dice.forEach((die) => {
      grouped[die]++
    })

    // Filter to only dice types that are present
    const presentDiceTypes = Object.entries(grouped)
      .filter(([_, count]) => count > 0)
      .map(([type]) => type as DieLabel)

    // Sort by the order they were first added
    const orderedDiceTypes = diceOrder.filter((dieType) =>
      presentDiceTypes.includes(dieType)
    )

    // Create the final result with counts
    return orderedDiceTypes.map((type) => ({
      type,
      count: grouped[type]
    }))
  }

  const getDiceNotation = (dice: DieLabel[]): string => {
    const grouped = groupDiceByType(dice)
    return grouped.map(({ type, count }) => `${count}${type}`).join('+')
  }

  const groupRollResults = (result: NumericRollResult) => {
    const diceLabels = dicePool.map((die) => sidesToLabel[die.sides])

    const groupedResults: Record<string, number[]> = {}

    diceLabels.forEach((dieLabel) => {
      if (!groupedResults[dieLabel]) {
        groupedResults[dieLabel] = []
      }
    })

    Object.values(result.rawRolls).forEach((values, i) => {
      const dieLabel = diceLabels[i] || 'Unknown'
      if (!groupedResults[dieLabel]) {
        groupedResults[dieLabel] = []
      }
      groupedResults[dieLabel].push(...values)
    })

    return groupedResults
  }

  const contextValue: CurrentRollContextType = {
    dicePool,
    rollResult,
    recentlyAddedDie,
    diceOrder,
    addDie,
    removeDie,
    clearPool,
    rollDice,
    groupDiceByType,
    getDiceNotation,
    groupRollResults
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
