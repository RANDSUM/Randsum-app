export type NotationDie = { notation: string }

export type PoolDie = {
  id: string
  sides: number
  _type: 'numeric'
}

export type NotationPoolDie = {
  id: string
  sides: NotationDie
  _type: 'notation'
}

export type AnyPoolDie = PoolDie | NotationPoolDie

export const sidesToLabel = (sides: number): string => `D${sides}`

export const labelToSides = (label: string): number => {
  const match = label.match(/^D(\d+)$/)
  if (match) {
    return parseInt(match[1], 10)
  }
  throw new Error(`Invalid die label: ${label}`)
}
