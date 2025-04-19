import { DieLabel, PoolDie, labelToSides, sidesToLabel } from '@/types/dice'
import { D, NumericRollResult, roll } from '@randsum/dice'
import { useRouter } from 'expo-router'
import React, { ReactNode, createContext, useContext, useState } from 'react'

type CurrentRollContextType = {
  dicePool: PoolDie[]
  rollResult: NumericRollResult | null

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

  const addDie = (dieLabel: DieLabel) => {
    const sides = labelToSides[dieLabel]
    const newDie = {
      id: Math.random().toString(36).substring(2, 9),
      sides
    }
    setDicePool([...dicePool, newDie])
  }

  const removeDie = (dieLabel: DieLabel) => {
    const sides = labelToSides[dieLabel]
    const dieToRemove = dicePool.find((die) => die.sides === sides)
    if (dieToRemove) {
      setDicePool(
        dicePool.filter(
          (_, index) =>
            index !== dicePool.findIndex((d) => d.id === dieToRemove.id)
        )
      )
    }
  }

  const clearPool = () => {
    setDicePool([])
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

    return Object.entries(grouped)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({ type: type as DieLabel, count }))
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
