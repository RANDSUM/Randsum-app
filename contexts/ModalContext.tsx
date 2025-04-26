import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'

type ModalContextType = {
  showRollResults: boolean
  showRollDetails: boolean
  showDiceDetails: boolean
  showNotationInput: boolean
  selectedDieId: string | null
  openRollResults: () => void
  closeRollResults: () => void
  openRollDetails: () => void
  closeRollDetails: () => void
  openDiceDetails: (dieId: string) => void
  closeDiceDetails: () => void
  openNotationInput: () => void
  closeNotationInput: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const [showRollResults, setShowRollResults] = useState(false)
  const [showRollDetails, setShowRollDetails] = useState(false)
  const [showDiceDetails, setShowDiceDetails] = useState(false)
  const [showNotationInput, setShowNotationInput] = useState(false)
  const [selectedDieId, setSelectedDieId] = useState<string | null>(null)

  function openRollResults() {
    setShowRollResults(true)
  }

  function closeRollResults() {
    setShowRollResults(false)
  }

  function openRollDetails() {
    setShowRollResults(false)
    setShowRollDetails(true)
  }

  function closeRollDetails() {
    setShowRollDetails(false)
  }

  function openDiceDetails(dieId: string) {
    setSelectedDieId(dieId)
    setShowDiceDetails(true)
  }

  function closeDiceDetails() {
    setShowDiceDetails(false)
    setSelectedDieId(null)
  }

  function openNotationInput() {
    setShowNotationInput(true)
  }

  function closeNotationInput() {
    setShowNotationInput(false)
  }

  const contextValue: ModalContextType = {
    showRollResults,
    showRollDetails,
    showDiceDetails,
    showNotationInput,
    selectedDieId,
    openRollResults,
    closeRollResults,
    openRollDetails,
    closeRollDetails,
    openDiceDetails,
    closeDiceDetails,
    openNotationInput,
    closeNotationInput
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
