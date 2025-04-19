import { DieLabel, PoolDie, labelToSides, sidesToLabel } from '@/types/dice'
import { D, NumericRollResult, roll } from '@randsum/dice'
import React, { ReactNode, createContext, useContext, useState } from 'react'

// Define the context type
type CurrentRollContextType = {
  // State
  dicePool: PoolDie[]
  rollResult: NumericRollResult | null
  modalVisible: boolean

  // Functions
  addDie: (dieLabel: DieLabel) => void
  removeDie: (dieLabel: DieLabel) => void
  clearPool: () => void
  rollDice: () => void
  setModalVisible: (visible: boolean) => void
  groupDiceByType: (dice: DieLabel[]) => { type: DieLabel; count: number }[]
  getDiceNotation: (dice: DieLabel[]) => string
  groupRollResults: (result: NumericRollResult) => Record<string, number[]>
}

// Create the context with a default undefined value
const CurrentRollContext = createContext<CurrentRollContextType | undefined>(
  undefined
)

// Provider props type
type CurrentRollProviderProps = {
  children: ReactNode
}

// Provider component
export function CurrentRollProvider({ children }: CurrentRollProviderProps) {
  // State for dice pool, results, and modal visibility
  const [dicePool, setDicePool] = useState<PoolDie[]>([])
  const [rollResult, setRollResult] = useState<NumericRollResult | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Add a die to the pool
  const addDie = (dieLabel: DieLabel) => {
    const sides = labelToSides[dieLabel]
    const newDie = {
      id: Math.random().toString(36).substring(2, 9),
      sides
    }
    setDicePool([...dicePool, newDie])
  }

  // Remove a die from the pool
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

  // Clear the dice pool
  const clearPool = () => {
    setDicePool([])
  }

  // Roll the dice
  const rollDice = () => {
    if (dicePool.length === 0) return

    // Create dice objects using the D class
    const diceToRoll = dicePool.map((die) => new D(die.sides))

    const result = roll(...diceToRoll) as NumericRollResult

    setRollResult(result)
    setModalVisible(true)
  }

  // Group dice by type for display
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

  // Generate dice notation string (e.g., "2D6+1D20")
  const getDiceNotation = (dice: DieLabel[]): string => {
    const grouped = groupDiceByType(dice)
    return grouped.map(({ type, count }) => `${count}${type}`).join('+')
  }

  // Group roll results by die type
  const groupRollResults = (result: NumericRollResult) => {
    // Get the dice labels from the current dice pool
    const diceLabels = dicePool.map((die) => sidesToLabel[die.sides])

    // Create a map of die type to values
    const groupedResults: Record<string, number[]> = {}

    // Initialize all die types with empty arrays
    diceLabels.forEach((dieLabel) => {
      if (!groupedResults[dieLabel]) {
        groupedResults[dieLabel] = []
      }
    })

    // Add all values to their respective die types
    Object.values(result.rawRolls).forEach((values, i) => {
      const dieLabel = diceLabels[i] || 'Unknown'
      if (!groupedResults[dieLabel]) {
        groupedResults[dieLabel] = []
      }
      groupedResults[dieLabel].push(...values)
    })

    return groupedResults
  }

  // Create the context value object
  const contextValue: CurrentRollContextType = {
    dicePool,
    rollResult,
    modalVisible,
    addDie,
    removeDie,
    clearPool,
    rollDice,
    setModalVisible,
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

// Custom hook to use the context
export function useCurrentRoll() {
  const context = useContext(CurrentRollContext)
  if (context === undefined) {
    throw new Error('useCurrentRoll must be used within a CurrentRollProvider')
  }
  return context
}
