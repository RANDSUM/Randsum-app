import { DiceNotation } from '@randsum/dice'

export type DiceType = 'standard' | 'notation'

export type BaseDie = {
  id: string
  quantity: number
  type: DiceType
}

export type StandardDie = BaseDie & {
  type: 'standard'
  sides: number
}

export type NotationDie = BaseDie & {
  type: 'notation'
  notation: DiceNotation
}

export type PoolDie = StandardDie | NotationDie

export type RollSource = {
  type: 'standard' | 'saved'
  name?: string
  dicePool: PoolDie[]
}

export const sidesToLabel = (sides: number): string => `D${sides}`

export const getDieNotation = (die: PoolDie): string => {
  if (die.type === 'notation') {
    return die.notation
  }
  return `${die.quantity}D${die.sides}`
}

export const hasModifiers = (die: PoolDie): boolean => {
  return die.type === 'notation'
}
