import { generateId } from '@/utils/id'

describe('generateId', () => {
  test('should return a string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
  })

  test('should return a string with length between 5 and 8 characters', () => {
    const id = generateId()
    expect(id.length).toBeGreaterThanOrEqual(5)
    expect(id.length).toBeLessThanOrEqual(8)
  })

  test('should return different values on subsequent calls', () => {
    const id1 = generateId()
    const id2 = generateId()
    const id3 = generateId()

    expect(id1).not.toBe(id2)
    expect(id2).not.toBe(id3)
    expect(id1).not.toBe(id3)
  })
})
