import { PoolDie } from '@/types/dice'
import { generateId } from '@/utils/id'
import { DiceNotation } from '@randsum/dice'

type CreateDieOptions =
  | {
      type: 'standard'
      sides: number
      quantity?: number
    }
  | {
      type: 'notation'
      notation: DiceNotation
      quantity?: number
    }

export function createDie(options: CreateDieOptions): PoolDie {
  const id = generateId()
  const quantity = options.quantity || 1

  if (options.type === 'standard') {
    return {
      id,
      type: 'standard',
      sides: options.sides,
      quantity
    }
  } else {
    return {
      id,
      type: 'notation',
      notation: options.notation,
      quantity
    }
  }
}
