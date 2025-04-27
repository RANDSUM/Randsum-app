import AsyncStorage from '@react-native-async-storage/async-storage'

describe('AsyncStorage Mock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('setItem stores a value', async () => {
    const key = 'solaire_of_astora'
    const value = 'praise_the_sun'

    await AsyncStorage.setItem(key, value)

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value)
  })

  test('getItem retrieves a value', async () => {
    const key = 'rumi_the_undying'
    const value = 'megamind_power'

    await AsyncStorage.setItem(key, value)
    const result = await AsyncStorage.getItem(key)

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key)
    expect(result).toBe(value)
  })

  test('removeItem removes a value', async () => {
    const key = 'jack_kirby'
    const value = 'new_gods'

    await AsyncStorage.setItem(key, value)
    await AsyncStorage.removeItem(key)
    const result = await AsyncStorage.getItem(key)

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key)
    expect(result).toBeNull()
  })

  test('clear removes all values', async () => {
    await AsyncStorage.setItem('mollie', 'darkseid')
    await AsyncStorage.setItem('jarvis', 'mister_miracle')

    await AsyncStorage.clear()

    expect(AsyncStorage.clear).toHaveBeenCalled()
    expect(await AsyncStorage.getItem('mollie')).toBeNull()
    expect(await AsyncStorage.getItem('jarvis')).toBeNull()
  })
})
