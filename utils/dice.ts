import { NotationDie, PoolDie } from '@/types/dice'

export const isNotationDie = (die: PoolDie): die is NotationDie => {
  return die.type === 'notation'
}

export const getNotation = (die: PoolDie): string => {
  if (isNotationDie(die)) {
    return die.notation
  }
  return ''
}
