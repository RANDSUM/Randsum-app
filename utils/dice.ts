import { NotationPoolDie, PoolDie } from '@/types/dice'

export const isNotationDie = (die: PoolDie): die is NotationPoolDie => {
  return die._type === 'notation'
}

export const getNotation = (die: PoolDie): string => {
  if (isNotationDie(die)) {
    return die.sides.notation
  }
  return ''
}
