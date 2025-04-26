import { PoolDie } from '@/types/dice'

export const getCommonDiceNotation = (dicePool: PoolDie[]): string => {
  return dicePool
    .map((die: PoolDie) =>
      die._type === 'notation'
        ? die.sides.notation
        : `${die.quantity}D${die.sides}`
    )
    .join('+')
}
