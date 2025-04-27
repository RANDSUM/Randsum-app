# Testing in Randsum App

## Jest Configuration

The Randsum App uses Jest for testing with TypeScript support. The configuration is set up in `package.json` and uses the `jest-expo` preset.

## AsyncStorage Mocking

AsyncStorage is mocked for tests using the official mock implementation provided by the `@react-native-async-storage/async-storage` package.

### How it works

1. The mock is configured in `jest.setup.ts`:
   ```typescript
   // Mock AsyncStorage
   jest.mock('@react-native-async-storage/async-storage', () =>
     require('@react-native-async-storage/async-storage/jest/async-storage-mock')
   )
   ```

2. The setup file is included in Jest configuration in `package.json`:
   ```json
   "jest": {
     "preset": "jest-expo",
     "setupFiles": [
       "./jest.setup.ts"
     ],
     "transformIgnorePatterns": [
       "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
     ]
   }
   ```

### Using AsyncStorage in Tests

The AsyncStorage mock implements all methods of the real AsyncStorage but stores data in memory. Each method is a Jest mock function, so you can use Jest's mock assertions:

```typescript
// Check if a method was called
expect(AsyncStorage.setItem).toHaveBeenCalledWith('key', 'value')

// Check how many times a method was called
expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1)
```

See `__tests__/AsyncStorage.test.ts` for examples of testing with the AsyncStorage mock.

## Running Tests

```bash
# Run all tests
npm test

# Run a specific test file
npm test path/to/test.ts

# Run tests with coverage
npm run test:coverage
```
