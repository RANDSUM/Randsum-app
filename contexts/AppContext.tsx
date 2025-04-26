import { Actions, AppAction } from '@/contexts/actions'
import { SavedRoll } from '@/types/savedRolls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { AppState, initialState, reducer } from './reducer'

const STORAGE_KEY = 'RANDSUM_SAVED_ROLLS'

type AppContextType = {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function loadSavedRolls() {
      try {
        const storedRolls = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedRolls) {
          dispatch(Actions.setSavedRolls(JSON.parse(storedRolls)))
        }
      } catch (error) {
        console.error('Failed to load saved rolls:', error)
      } finally {
        dispatch(Actions.setSavedRollsLoading(false))
      }
    }

    loadSavedRolls()
  }, [])

  async function persistSavedRolls(rolls: SavedRoll[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rolls))
    } catch (error) {
      console.error('Failed to save rolls:', error)
    }
  }

  useEffect(() => {
    if (state.currentRoll.recentlyAddedDie) {
      setTimeout(() => {
        dispatch(Actions.clearRecentlyAddedDie())
      }, 300)
    }
  }, [state.currentRoll.recentlyAddedDie])

  useEffect(() => {
    persistSavedRolls(state.savedRolls.rolls)
  }, [state.savedRolls.rolls])

  const contextValue: AppContextType = {
    state,
    dispatch
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
