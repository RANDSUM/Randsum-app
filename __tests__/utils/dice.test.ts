import { NotationPoolDie, StandardPoolDie } from '@/types/dice'
import { getNotation, isNotationDie } from '@/utils/dice'

describe('dice utility functions', () => {
  describe('isNotationDie', () => {
    test('should return true for notation die', () => {
      const notationDie: NotationPoolDie = {
        id: 'test-id',
        sides: { notation: '2D6+3' },
        quantity: 1,
        _type: 'notation'
      }

      expect(isNotationDie(notationDie)).toBe(true)
    })

    test('should return false for standard die', () => {
      const standardDie: StandardPoolDie = {
        id: 'test-id',
        sides: 20,
        quantity: 2,
        _type: 'numeric'
      }

      expect(isNotationDie(standardDie)).toBe(false)
    })
  })

  describe('getNotation', () => {
    test('should return notation string for notation die', () => {
      const notationDie: NotationPoolDie = {
        id: 'test-id',
        sides: { notation: '2D6+3' },
        quantity: 1,
        _type: 'notation'
      }

      expect(getNotation(notationDie)).toBe('2D6+3')
    })

    test('should return empty string for standard die', () => {
      const standardDie: StandardPoolDie = {
        id: 'test-id',
        sides: 20,
        quantity: 2,
        _type: 'numeric'
      }

      expect(getNotation(standardDie)).toBe('')
    })
  })
})
