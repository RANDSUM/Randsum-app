export type DieSides = 4 | 6 | 8 | 10 | 12 | 20 | 100
export type PoolDie = { id: string; sides: DieSides }

// For display purposes
export type DieLabel = 'D4' | 'D6' | 'D8' | 'D10' | 'D12' | 'D20' | 'D100'

// Map sides to labels
export const sidesToLabel: Record<DieSides, DieLabel> = {
  4: 'D4',
  6: 'D6',
  8: 'D8',
  10: 'D10',
  12: 'D12',
  20: 'D20',
  100: 'D100'
}

// Map labels to sides
export const labelToSides: Record<DieLabel, DieSides> = {
  D4: 4,
  D6: 6,
  D8: 8,
  D10: 10,
  D12: 12,
  D20: 20,
  D100: 100
}
