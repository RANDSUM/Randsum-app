import { PoolDie } from '@/types/dice'
import { SavedRoll } from '@/types/savedRolls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const STORAGE_KEY = 'RANDSUM_SAVED_ROLLS'

type SavedRollsContextType = {
  savedRolls: SavedRoll[]
  saveRoll: (name: string, dicePool: PoolDie[]) => Promise<SavedRoll>
  deleteRoll: (id: string) => Promise<void>
  isLoading: boolean
}

const SavedRollsContext = createContext<SavedRollsContextType | undefined>(
  undefined
)

export function SavedRollsProvider({ children }: PropsWithChildren) {
  const [savedRolls, setSavedRolls] = useState<SavedRoll[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSavedRolls()
  }, [])

  async function loadSavedRolls() {
    try {
      const storedRolls = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedRolls) {
        setSavedRolls(JSON.parse(storedRolls))
      }
    } catch (error) {
      console.error('Failed to load saved rolls:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function persistSavedRolls(rolls: SavedRoll[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rolls))
    } catch (error) {
      console.error('Failed to save rolls:', error)
    }
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 9)
  }

  async function saveRoll(
    name: string,
    dicePool: PoolDie[]
  ): Promise<SavedRoll> {
    const newRoll: SavedRoll = {
      id: generateId(),
      name,
      dicePool,
      createdAt: Date.now()
    }

    const updatedRolls = [...savedRolls, newRoll]
    setSavedRolls(updatedRolls)
    await persistSavedRolls(updatedRolls)
    return newRoll
  }

  async function deleteRoll(id: string): Promise<void> {
    const updatedRolls = savedRolls.filter((roll) => roll.id !== id)
    setSavedRolls(updatedRolls)
    await persistSavedRolls(updatedRolls)
  }

  const contextValue: SavedRollsContextType = {
    savedRolls,
    saveRoll,
    deleteRoll,
    isLoading
  }

  return (
    <SavedRollsContext.Provider value={contextValue}>
      {children}
    </SavedRollsContext.Provider>
  )
}

export function useSavedRolls() {
  const context = useContext(SavedRollsContext)

  if (context === undefined) {
    throw new Error('useSavedRolls must be used within a SavedRollsProvider')
  }
  return context
}
