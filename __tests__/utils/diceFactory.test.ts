import { createNotationDie, createStandardDie } from '@/utils/diceFactory'

describe('diceFactory utility functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createStandardDie', () => {
    test('should create a standard die with default quantity', () => {
      const die = createStandardDie(20)

      expect(die).toMatchObject({
        sides: 20,
        quantity: 1,
        _type: 'numeric'
      })
      expect(typeof die.id).toBe('string')
    })

    test('should create a standard die with specified quantity', () => {
      const die = createStandardDie(6, 3)

      expect(die).toMatchObject({
        sides: 6,
        quantity: 3,
        _type: 'numeric'
      })
      expect(typeof die.id).toBe('string')
    })
  })

  describe('createNotationDie', () => {
    test('should create a notation die', () => {
      const die = createNotationDie('2D6+3')

      expect(die).toMatchObject({
        sides: { notation: '2D6+3' },
        quantity: 1,
        _type: 'notation'
      })
      expect(typeof die.id).toBe('string')
    })
  })
})
