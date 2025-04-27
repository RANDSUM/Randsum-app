# RANDSUM App Design System

This document outlines the design system used in the RANDSUM app, following the Atomic Design pattern.

## Table of Contents

1. [Introduction](#introduction)
2. [Atomic Design Structure](#atomic-design-structure)
3. [Theme](#theme)
4. [Components](#components)
5. [Usage Guidelines](#usage-guidelines)

## Introduction

The RANDSUM app uses the Atomic Design methodology to organize UI components. This approach breaks down the interface into fundamental building blocks and combines them to form more complex UI patterns.

## Atomic Design Structure

The component hierarchy follows the Atomic Design pattern:

```
components/
├── atoms/         # Basic UI elements
├── molecules/     # Combinations of atoms
├── organisms/     # Complex UI sections
├── templates/     # Page layouts
└── pages/         # Screen components
```

### Atoms

Atoms are the basic building blocks of the interface. They include:

- Button
- Text
- TextInput
- View
- Surface
- IconButton
- etc.

### Molecules

Molecules are groups of atoms bonded together, forming more complex UI elements:

- DiceButton
- RollButton
- SaveButton
- ClearButton
- DicePoolTile
- SavedRollItem
- etc.

### Organisms

Organisms are groups of molecules and atoms that form distinct sections of the interface:

- DicePool
- DiceButtons
- RollResultsToast
- DiceDetailsModal
- NotationInputModal
- etc.

### Templates

Templates are page-level objects that place components into a layout:

- MainLayout
- DrawerLayout

### Pages

Pages are specific instances of templates that show what a UI looks like with real content:

- DiceRollerPage
- SavedRollsPage
- NotationValidatorPage

## Theme

The app follows Material Design 3 guidelines with a dark theme. The color palette includes:

- **Primary**: Rich Purple (#6750A4)
- **Secondary**: Muted Gold (CAC4D0)
- **Tertiary**: Soft Lavender (#9A82DB)
- **Background**: Dark (#1C1B1F)

## Components

### Atoms

#### Button

The Button component is a wrapper around the Paper Button with custom styling.

```tsx
<Button
  mode="contained"
  onPress={handlePress}
  buttonColor={theme.colors.primary}
  textColor={theme.colors.onPrimary}
>
  Button Text
</Button>
```

#### Text

The Text component is used for all text in the app.

```tsx
<Text variant="bodyLarge" style={styles.text}>
  Text content
</Text>
```

### Molecules

#### DiceButton

The DiceButton component represents a button for a specific die type.

```tsx
<DiceButton sides={20} onPress={addDie} />
```

#### RollButton

The RollButton component is used to roll the dice in the pool.

```tsx
<RollButton />
```

### Organisms

#### DicePool

The DicePool component displays the current dice pool.

```tsx
<DicePool />
```

#### DiceButtons

The DiceButtons component displays all the dice buttons and utility buttons.

```tsx
<DiceButtons />
```

### Templates

#### MainLayout

The MainLayout component provides a consistent layout for pages.

```tsx
<MainLayout>
  {/* Page content */}
</MainLayout>
```

### Pages

#### DiceRollerPage

The DiceRollerPage component is the main screen of the app.

```tsx
<DiceRollerPage />
```

## Usage Guidelines

1. **Import from the appropriate level**: Import components from the most specific level possible.

   ```tsx
   // Good
   import { Button } from '@/components/atoms'
   
   // Avoid
   import { Button } from '@/components/Themed'
   ```

2. **Composition over inheritance**: Build complex components by composing simpler ones.

3. **Theme consistency**: Use the theme colors and styles for consistent appearance.

4. **Testing**: Test components at each level of the hierarchy.

5. **Documentation**: Document new components and their usage.

## Migration

The app is currently transitioning from a flat component structure to the Atomic Design pattern. A compatibility layer is provided in `components/Themed.tsx` to maintain backward compatibility with existing code.

New code should import directly from the atomic design folders:

```tsx
// New code
import { Button, Text } from '@/components/atoms'
import { DiceButton } from '@/components/molecules'
import { DicePool } from '@/components/organisms'
```
