# Zustand Store Architecture

This application uses Zustand for state management, organized into slices for better maintainability.

## Store Structure

The store is divided into three main slices:

1. **Dice Slice** - Manages the current dice pool and roll results
2. **Saved Rolls Slice** - Handles saved dice roll configurations
3. **Modals Slice** - Controls the visibility of various modals in the application

## Usage

Import the store from the main entry point:

```typescript
import { useStore } from '@/store'
```

Access state and actions using the type-safe selectors:

```typescript
// Accessing state
const dicePool = useStore.use.currentRoll().dicePool
const savedRolls = useStore.use.savedRolls().rolls
const showRollResults = useStore.use.modals().showRollResults

// Using actions
const addDie = useStore.use.addDie()
const rollDice = useStore.use.rollDice()
const openRollResults = useStore.use.openRollResults()
```

## Persistence

The store uses Zustand's persist middleware to save the saved rolls to AsyncStorage. Only the `savedRolls.rolls` portion of the state is persisted between app sessions.

## Slices

### Dice Slice

Located in `store/slices/diceSlice.ts`, this slice manages:
- Current dice pool
- Roll results
- Recently added die animations

### Saved Rolls Slice

Located in `store/slices/savedRollsSlice.ts`, this slice manages:
- List of saved dice roll configurations
- Loading state for saved rolls

### Modals Slice

Located in `store/slices/modalsSlice.ts`, this slice manages:
- Visibility state for all modals
- Selected die ID for the dice details modal
