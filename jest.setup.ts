import '@testing-library/jest-native/extend-expect'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

type MockHapticService = {
  light: jest.Mock
  medium: jest.Mock
  heavy: jest.Mock
}

const mockHapticService: MockHapticService = {
  light: jest.fn(),
  medium: jest.fn(),
  heavy: jest.fn()
}

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('@/utils/haptics', () => ({
  HapticService: mockHapticService
}))

// Global test setup
beforeAll(() => {
  // Add any global setup here
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  // Add any global teardown here
})

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
})

// Type augmentation for global test utilities
declare global {
  namespace jest {
    interface Matchers<R> {
      // Add custom matcher types here
    }
  }
}