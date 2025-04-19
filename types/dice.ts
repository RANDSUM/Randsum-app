import { DiceNotation } from '@randsum/dice'

export type NotationDie = { notation: DiceNotation }

export type StandardPoolDie = {
  id: string
  sides: number
  quantity: number
  _type: 'numeric'
}

export type NotationPoolDie = {
  id: string
  sides: NotationDie
  quantity: number
  _type: 'notation'
}

export type PoolDie = StandardPoolDie | NotationPoolDie

export const sidesToLabel = (sides: number): string => `D${sides}`
