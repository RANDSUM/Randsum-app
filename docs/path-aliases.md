# TypeScript Path Aliases

This project uses TypeScript path aliases to simplify imports and improve code organization.

## Available Aliases

| Alias           | Path             | Description                                                 |
| --------------- | ---------------- | ----------------------------------------------------------- |
| `@/*`           | `./`             | Root directory (legacy alias, maintained for compatibility) |
| `@components/*` | `./components/*` | UI components                                               |
| `@store/*`      | `./store/*`      | Zustand store and state management                          |
| `@utils/*`      | `./utils/*`      | Utility functions                                           |
| `@types/*`      | `./types/*`      | TypeScript type definitions                                 |
| `@constants/*`  | `./constants/*`  | Constants and configuration values                          |
| `@assets/*`     | `./assets/*`     | Static assets (images, fonts, etc.)                         |
| `@hooks/*`      | `./hooks/*`      | Custom React hooks                                          |

## Usage Examples

Instead of using relative imports like:

```typescript
import { Button } from '../../../components/Themed'
import { useStore } from '../../../store'
```

You can use path aliases:

```typescript
import { Button } from '@components/Themed'
import { useStore } from '@store'
```

## Configuration

Path aliases are configured in:

1. `tsconfig.json` - For TypeScript compiler
2. `jest.config.ts` - For Jest testing

If you add a new path alias, make sure to update both files.
