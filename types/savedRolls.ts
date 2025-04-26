import { PoolDie } from './dice'

export type SavedRoll = {
  id: string
  name: string
  dicePool: PoolDie[]
  createdAt: number
}
