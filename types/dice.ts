import { DiceNotation } from '@randsum/dice'

export enum DiceType {
  STANDARD = 'standard',
  NOTATION = 'notation'
}

export type BaseDie = {
  id: string
  quantity: number
  type: DiceType
}

export type StandardDie = BaseDie & {
  type: DiceType.STANDARD
  sides: number
}

export type NotationDie = BaseDie & {
  type: DiceType.NOTATION
  notation: DiceNotation
}

export type PoolDie = StandardDie | NotationDie

export const sidesToLabel = (sides: number): string => `D${sides}`

export const getDieNotation = (die: PoolDie): string => {
  if (die.type === DiceType.NOTATION) {
    return die.notation
  }
  return `${die.quantity}D${die.sides}`
}

export const hasModifiers = (die: PoolDie): boolean => {
  return die.type === DiceType.NOTATION
}
