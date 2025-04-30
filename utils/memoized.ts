import { NumericRollResult } from '@randsum/dice'
import { useMemo } from 'react'

import { getCommonDiceNotation } from './diceNotation'
import { groupRollResults } from './diceResults'

import { PoolDie } from '@/types/dice'

/**
 * Custom hook to memoize the common dice notation string
 * Prevents recalculation when dicePool hasn't changed
 */
export function useMemoizedDiceNotation(dicePool: PoolDie[]): string {
  return useMemo(() => getCommonDiceNotation(dicePool), [dicePool])
}

/**
 * Custom hook to memoize the grouped roll results
 * Prevents recalculation when rollResult hasn't changed
 */
export function useMemoizedRollResults(
  rollResult: NumericRollResult | undefined
): ReturnType<typeof groupRollResults> {
  return useMemo(() => {
    if (!rollResult) return []
    return groupRollResults(rollResult)
  }, [rollResult])
}

/**
 * Custom hook to find a die by ID in the dice pool
 * Prevents recalculation when dicePool or selectedDieId haven't changed
 */
export function useMemoizedFindDie(
  dicePool: PoolDie[],
  selectedDieId: string | null
): PoolDie | undefined {
  return useMemo(() => {
    if (!selectedDieId) return undefined
    return dicePool.find((die) => die.id === selectedDieId)
  }, [dicePool, selectedDieId])
}
