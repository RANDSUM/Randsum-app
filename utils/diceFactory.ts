import { NotationPoolDie, StandardPoolDie } from '@/types/dice'
import { generateId } from '@/utils/id'
import { DiceNotation } from '@randsum/dice'

export const createStandardDie = (
  sides: number,
  quantity: number = 1
): StandardPoolDie => ({
  id: generateId(),
  sides,
  quantity,
  _type: 'numeric'
})

export const createNotationDie = (notation: DiceNotation): NotationPoolDie => ({
  id: generateId(),
  sides: { notation },
  quantity: 1,
  _type: 'notation'
})
