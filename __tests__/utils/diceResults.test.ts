import { groupRollResults } from '@/utils/diceResults'
import { NumericRollResult } from '@randsum/dice'

describe('diceResults utility functions', () => {
  describe('groupRollResults', () => {
    test('should group roll results correctly', () => {
      const mockResult: NumericRollResult = {
        total: 15,
        dicePools: {
          pool1: { notation: '2D6', sides: 6, quantity: 2 },
          pool2: { notation: '1D8+3', sides: 8, quantity: 1 }
        },
        rawRolls: {
          pool1: [3, 5],
          pool2: [4]
        },
        modifiedRolls: {
          pool1: { rolls: [3, 5], total: 8 },
          pool2: { rolls: [4], total: 7 }
        }
      }

      const result = groupRollResults(mockResult)

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        label: '2D6',
        total: 8,
        results: [3, 5],
        rejectedRolls: []
      })
      expect(result[1]).toEqual({
        label: '1D8+3',
        total: 7,
        results: [4],
        rejectedRolls: []
      })
    })

    test('should identify rejected rolls correctly', () => {
      const mockResult: NumericRollResult = {
        total: 11,
        dicePools: {
          pool1: { notation: '3D6L', sides: 6, quantity: 3 }
        },
        rawRolls: {
          pool1: [1, 4, 6]
        },
        modifiedRolls: {
          pool1: { rolls: [4, 6], total: 10 }
        }
      }

      const result = groupRollResults(mockResult)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        label: '3D6L',
        total: 10,
        results: [4, 6],
        rejectedRolls: [1]
      })
    })

    test('should handle empty result correctly', () => {
      const mockResult: NumericRollResult = {
        total: 0,
        dicePools: {},
        rawRolls: {},
        modifiedRolls: {}
      }

      const result = groupRollResults(mockResult)

      expect(result).toEqual([])
    })
  })
})
