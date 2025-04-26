import { NumericRollResult } from '@randsum/dice'

export const groupRollResults = (
  result: NumericRollResult
): {
  label: string
  total: number
  results: number[]
  rejectedRolls: number[]
}[] => {
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
