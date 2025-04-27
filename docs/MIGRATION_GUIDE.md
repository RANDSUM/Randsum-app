# Migration Guide: Atomic Design Pattern

This guide outlines the process for migrating components from the flat structure to the Atomic Design pattern.

## Table of Contents

1. [Overview](#overview)
2. [Migration Steps](#migration-steps)
3. [Component Mapping](#component-mapping)
4. [Testing](#testing)
5. [Best Practices](#best-practices)

## Overview

The RANDSUM app is transitioning from a flat component structure to the Atomic Design pattern. This pattern organizes components into five distinct levels:

1. **Atoms**: Basic UI elements (Button, Text, etc.)
2. **Molecules**: Simple combinations of atoms (DiceButton, RollButton, etc.)
3. **Organisms**: Complex UI sections (DicePool, DiceButtons, etc.)
4. **Templates**: Page layouts (MainLayout, DrawerLayout)
5. **Pages**: Screen components (DiceRollerPage, SavedRollsPage, etc.)

## Migration Steps

### 1. Identify Component Type

Determine which level of the Atomic Design pattern the component belongs to:

- **Atom**: Basic UI element with no dependencies on other components
- **Molecule**: Simple component composed of atoms
- **Organism**: Complex component composed of molecules and atoms
- **Template**: Layout component that arranges organisms
- **Page**: Screen component that uses templates and organisms

### 2. Create New Component File

Create a new file in the appropriate directory:

```
components/
├── atoms/
├── molecules/
├── organisms/
├── templates/
└── pages/
```

### 3. Migrate Component Code

Copy the component code to the new file, updating imports to use the atomic design structure:

```tsx
// Before
import { Button, Text } from '@/components/Themed'

// After
import { Button, Text } from '@/components/atoms'
```

### 4. Update Exports

Make sure the component is properly exported from its directory's index.ts file:

```tsx
// components/molecules/index.ts
export { DiceButton } from './DiceButton'
```

### 5. Update Imports in Other Files

Update imports in files that use the component:

```tsx
// Before
import DiceButton from '@/components/DiceButton'

// After
import { DiceButton } from '@/components/molecules'
```

### 6. Update Tests

Create or update tests to use the new component structure.

## Component Mapping

Here's a mapping of existing components to their Atomic Design levels:

### Atoms

- Button
- Text
- TextInput
- View
- Surface
- IconButton
- Dialog
- Portal
- ActivityIndicator
- Snackbar
- Card

### Molecules

- DiceButton
- RollButton
- SaveButton
- ClearButton
- DicePoolTile
- SavedRollItem
- Footer
- NotationValidatorForm
- NotationGuide

### Organisms

- DicePool
- DiceButtons
- RollResultsToast
- DiceDetailsModal
- RollDetailsModal
- NotationInputModal
- SaveRollModal

### Templates

- MainLayout
- DrawerLayout

### Pages

- DiceRollerPage
- SavedRollsPage
- NotationValidatorPage

## Testing

When migrating components, create corresponding tests in the `__tests__/components/` directory:

```
__tests__/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
```

## Best Practices

1. **Use named exports**: Export components using named exports instead of default exports:

   ```tsx
   // Good
   export function Button() { ... }
   
   // Avoid
   export default function Button() { ... }
   ```

2. **Import from index files**: Import components from the level's index file:

   ```tsx
   // Good
   import { Button, Text } from '@/components/atoms'
   
   // Avoid
   import { Button } from '@/components/atoms/Button'
   import { Text } from '@/components/atoms/Text'
   ```

3. **Composition over inheritance**: Build complex components by composing simpler ones.

4. **Maintain compatibility**: Use the compatibility layer in `components/Themed.tsx` during the transition.

5. **Update tests**: Create or update tests for each migrated component.

6. **Document components**: Add JSDoc comments to document component props and usage.

7. **Use TypeScript**: Define proper types for component props.

## Compatibility Layer

During the migration, a compatibility layer is provided in `components/Themed.tsx` to maintain backward compatibility with existing code. This layer re-exports components from the atomic design structure.

New code should import directly from the atomic design folders, while the compatibility layer will be gradually phased out as all components are migrated.
