import { NotationPoolDie, StandardPoolDie } from '@/types/dice'
import { getCommonDiceNotation } from '@/utils/diceNotation'

describe('diceNotation utility functions', () => {
  describe('getCommonDiceNotation', () => {
    test('should return empty string for empty dice pool', () => {
      expect(getCommonDiceNotation([])).toBe('')
    })

    test('should format standard dice correctly', () => {
      const dicePool: StandardPoolDie[] = [
        {
          id: 'die1',
          sides: 20,
          quantity: 2,
          _type: 'numeric'
        },
        {
          id: 'die2',
          sides: 6,
          quantity: 3,
          _type: 'numeric'
        }
      ]

      expect(getCommonDiceNotation(dicePool)).toBe('2D20+3D6')
    })

    test('should preserve notation dice format', () => {
      const dicePool = [
        {
          id: 'die1',
          sides: { notation: '2D6+3' },
          quantity: 1,
          _type: 'notation'
        } as NotationPoolDie,
        {
          id: 'die2',
          sides: 20,
          quantity: 1,
          _type: 'numeric'
        } as StandardPoolDie
      ]

      expect(getCommonDiceNotation(dicePool)).toBe('2D6+3+1D20')
    })

    test('should join multiple dice with plus signs', () => {
      const dicePool = [
        {
          id: 'die1',
          sides: 20,
          quantity: 1,
          _type: 'numeric'
        } as StandardPoolDie,
        {
          id: 'die2',
          sides: 12,
          quantity: 2,
          _type: 'numeric'
        } as StandardPoolDie,
        {
          id: 'die3',
          sides: { notation: '3D8L' },
          quantity: 1,
          _type: 'notation'
        } as NotationPoolDie
      ]

      expect(getCommonDiceNotation(dicePool)).toBe('1D20+2D12+3D8L')
    })
  })
})
