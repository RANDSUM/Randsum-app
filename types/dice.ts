export type NotationDie = { notation: string }

export type StandardPoolDie = {
  id: string
  sides: number
  quantity: number
  _type: 'numeric'
}

export type NotationPoolDie = {
  id: string
  sides: NotationDie
  quantity: number
  _type: 'notation'
}

export type PoolDie = StandardPoolDie | NotationPoolDie

export const sidesToLabel = (sides: number): string => `D${sides}`

export const labelToSides = (label: string): number => {
  const match = label.match(/^D(\d+)$/)
  if (match) {
    return parseInt(match[1], 10)
  }
  throw new Error(`Invalid die label: ${label}`)
}
