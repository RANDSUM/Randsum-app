import { PoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import { generateId } from './id'

/**
 * Creates a new SavedRoll object with the given name and dice pool
 *
 * @param name The name of the saved roll
 * @param dicePool The dice pool to save
 * @returns A new SavedRoll object
 */
export function createSavedRoll(name: string, dicePool: PoolDie[]): SavedRoll {
  return {
    id: generateId(),
    name,
    dicePool,
    createdAt: Date.now()
  }
}
