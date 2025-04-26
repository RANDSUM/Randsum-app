// This file is automatically loaded by Jest before running tests
// It's used to set up the testing environment

// Mock the HapticService
jest.mock('@/utils/haptics', () => ({
  HapticService: {
    light: jest.fn(),
    medium: jest.fn()
  }
}));

// Mock the generateId function
jest.mock('@/utils/id', () => ({
  generateId: jest.fn(() => 'test-id-123')
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve())
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Setup for React Native Testing Library
import '@testing-library/jest-native/extend-expect';

// Global setup
beforeEach(() => {
  jest.clearAllMocks();
});
