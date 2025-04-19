import {
  AnyPoolDie,
  NotationPoolDie,
  PoolDie,
  labelToSides,
  sidesToLabel
} from '@/types/dice'
import { D, NumericRollOptions, NumericRollResult, roll } from '@randsum/dice'
import { validateNotation } from '@randsum/notation'
import { useRouter } from 'expo-router'
import React, { ReactNode, createContext, useContext, useState } from 'react'

type CurrentRollContextType = {
  dicePool: AnyPoolDie[]
  rollResult: NumericRollResult | null
  recentlyAddedDie: string | null
  diceOrder: string[]

  addDie: (string: string) => void
  addNotationDie: (notation: string) => void
  removeDie: (string: string) => void
  clearPool: () => void
  rollDice: () => void
  groupDiceByLabel: (
    dice: string[]
  ) => { label: string; count: number; type: 'numeric' | 'notation' }[]
  getDiceNotation: (dice: string[]) => string
  groupRollResults: (result: NumericRollResult) => Record<string, number[]>
  isNotationDie: (die: AnyPoolDie) => die is NotationPoolDie
  getNotation: (die: AnyPoolDie) => string
}

const CurrentRollContext = createContext<CurrentRollContextType | undefined>(
  undefined
)

type CurrentRollProviderProps = {
  children: ReactNode
}

export function CurrentRollProvider({ children }: CurrentRollProviderProps) {
  const router = useRouter()
  const [dicePool, setDicePool] = useState<AnyPoolDie[]>([])
  const [rollResult, setRollResult] = useState<NumericRollResult | null>(null)
  const [recentlyAddedDie, setRecentlyAddedDie] = useState<string | null>(null)
  const [diceOrder, setDiceOrder] = useState<string[]>([])

  function isNotationDie(die: AnyPoolDie): die is NotationPoolDie {
    return die._type === 'notation'
  }

  function getNotation(die: AnyPoolDie): string {
    if (isNotationDie(die)) {
      return die.sides.notation
    }
    return ''
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 9)
  }

  function updateDiceOrderAndAnimate(dieLabel: string) {
    setRecentlyAddedDie(dieLabel)

    if (!diceOrder.includes(dieLabel)) {
      setDiceOrder([...diceOrder, dieLabel])
    }

    setTimeout(function () {
      setRecentlyAddedDie(null)
    }, 300)
  }

  function createStandardDie(sides: number): PoolDie {
    return {
      id: generateId(),
      sides,
      _type: 'numeric'
    }
  }

  function createNotationDie(notation: string): NotationPoolDie {
    return {
      id: generateId(),
      sides: { notation },
      _type: 'notation'
    }
  }

  function addDie(string: string) {
    const sides = labelToSides(string)
    const newDie = createStandardDie(sides)
    setDicePool([...dicePool, newDie])
    updateDiceOrderAndAnimate(string)
  }

  function addNotationDie(notation: string) {
    const validationResult = validateNotation(notation)
    if (!validationResult.valid) return

    const formattedNotation = notation.replace(/d(\d+|\{)/gi, 'D$1')

    const {
      modifiers,
      quantity = 1,
      sides
    } = validationResult.digested as NumericRollOptions
    console.log('MODIFIERS: ', modifiers)

    if (!(Object.keys(modifiers || {}).length > 0)) {
      const newDice: PoolDie[] = []

      for (let i = 0; i < quantity; i++) {
        newDice.push(createStandardDie(sides))
      }

      setDicePool([...dicePool, ...newDice])
      updateDiceOrderAndAnimate(`D${sides}`)

      return
    }

    const newDie = createNotationDie(formattedNotation)

    setDicePool([...dicePool, newDie])
    updateDiceOrderAndAnimate(formattedNotation)
  }

  function removeDie(string: string) {
    let dieToRemove: AnyPoolDie | undefined

    if (string.match(/^D\d+$/)) {
      try {
        const sides = labelToSides(string)
        dieToRemove = dicePool.find(function (die) {
          return die._type === 'numeric' && die.sides === sides
        })
      } catch {}
    } else {
      dieToRemove = dicePool.find(function (die) {
        return die._type === 'notation' && getNotation(die) === string
      })
    }

    if (dieToRemove) {
      setDicePool(
        dicePool.filter(function (_, index) {
          return (
            index !==
            dicePool.findIndex(function (d) {
              return d.id === dieToRemove.id
            })
          )
        })
      )

      const remainingDiceOfType = dicePool.filter(function (die) {
        if (die._type === 'notation' && dieToRemove._type === 'notation') {
          return (
            getNotation(die) === getNotation(dieToRemove) &&
            die.id !== dieToRemove.id
          )
        } else if (die._type === 'numeric' && dieToRemove._type === 'numeric') {
          return die.sides === dieToRemove.sides && die.id !== dieToRemove.id
        }
        return false
      })

      if (remainingDiceOfType.length === 0) {
        setDiceOrder(
          diceOrder.filter(function (type) {
            return type !== string
          })
        )
      }
    }
  }

  function clearPool() {
    setDicePool([])
    setDiceOrder([])
  }

  function rollDice() {
    if (dicePool.length === 0) return

    const diceToRoll = dicePool.map(function (die) {
      if (die._type === 'notation') {
        const notation = die.sides.notation

        return new D(notation as any)
      } else {
        return new D(die.sides)
      }
    })

    const result = roll(...diceToRoll) as NumericRollResult

    setRollResult(result)
    router.push('/roll-results')
  }

  function isDieNotation(label: string): boolean {
    return /^\d/.test(label)
  }

  function groupDiceByLabel(dice: string[]): {
    label: string
    count: number
    type: 'numeric' | 'notation'
  }[] {
    const grouped: Record<string, number> = {}

    dice.forEach(function (die) {
      grouped[die] = (grouped[die] || 0) + 1
    })

    const presentDiceLabels = Object.entries(grouped)
      .filter(function ([_, count]) {
        return count > 0
      })
      .map(function ([label]) {
        return label
      })

    const orderedDiceLabels = diceOrder.filter(function (dieType) {
      return presentDiceLabels.includes(dieType)
    })

    return orderedDiceLabels.map(function (label) {
      return {
        label,
        count: grouped[label],
        type: isDieNotation(label) ? 'notation' : 'numeric'
      }
    })
  }

  function getDiceNotation(dice: string[]): string {
    const grouped = groupDiceByLabel(dice)
    return grouped
      .map(function ({ label, count, type }) {
        return type === 'notation' ? label : `${count}${label}`
      })
      .join('+')
  }

  function groupRollResults(result: NumericRollResult) {
    const diceLabels = dicePool.map(function (die) {
      if (die._type === 'notation') {
        return die.sides.notation
      } else {
        return sidesToLabel(die.sides)
      }
    })

    const groupedResults: Record<string, number[]> = {}

    diceLabels.forEach(function (string) {
      if (!groupedResults[string]) {
        groupedResults[string] = []
      }
    })

    Object.values(result.rawRolls).forEach(function (values, i) {
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
    diceOrder,
    addDie,
    addNotationDie,
    removeDie,
    clearPool,
    rollDice,
    groupDiceByLabel,
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
