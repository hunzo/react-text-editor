import { EditorState } from 'draft-js'
import { createContext, useContext, useState } from 'react'
import useLocalStorage from './useLocalStorage'

interface GlobalState {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export const editorContext = createContext<GlobalState | undefined>(undefined)

export const EditorProvider: React.FC = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [state, setState] = useLocalStorage('state', '')

  const values = {
    editorState,
    setEditorState,
    state,
    setState,
  }
  return (
    <editorContext.Provider value={values}>{children}</editorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(editorContext)
  if (!context) throw new Error('useEditor must be call inside EditorProvider')
  return context
}
