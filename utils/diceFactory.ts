import { DiceType, PoolDie } from '@/types/dice'
import { generateId } from '@/utils/id'
import { DiceNotation } from '@randsum/dice'

type CreateDieOptions =
  | {
      type: DiceType.STANDARD
      sides: number
      quantity?: number
    }
  | {
      type: DiceType.NOTATION
      notation: DiceNotation
      quantity?: number
    }

export function createDie(options: CreateDieOptions): PoolDie {
  const id = generateId()
  const quantity = options.quantity || 1

  if (options.type === DiceType.STANDARD) {
    return {
      id,
      type: DiceType.STANDARD,
      sides: options.sides,
      quantity
    }
  } else {
    return {
      id,
      type: DiceType.NOTATION,
      notation: options.notation,
      quantity
    }
  }
}
