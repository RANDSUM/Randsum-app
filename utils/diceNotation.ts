import { PoolDie } from '@/types/dice'

export const getCommonDiceNotation = (dicePool: PoolDie[]): string => {
  return dicePool
    .map((die: PoolDie) =>
      die.type === 'notation' ? die.notation : `${die.quantity}D${die.sides}`
    )
    .join('+')
}
