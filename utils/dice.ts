import { NotationPoolDie, PoolDie } from '@/types/dice'

/**
 * Type guard to check if a die is a notation die
 * @param die The die to check
 * @returns True if the die is a notation die, false otherwise
 */
export const isNotationDie = (die: PoolDie): die is NotationPoolDie => {
  return die._type === 'notation'
}
