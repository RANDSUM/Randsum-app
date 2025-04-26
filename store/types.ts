import { DiceSlice } from './slices/diceSlice'
import { ModalsSlice } from './slices/modalsSlice'
import { SavedRollsSlice } from './slices/savedRollsSlice'

export type StoreState = DiceSlice & SavedRollsSlice & ModalsSlice
