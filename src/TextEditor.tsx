import {
  convertFromRaw,
  convertToRaw,
  DraftEditorCommand,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from 'draft-js'
import { useCallback, useRef, useState } from 'react'
import { useEditor } from './editorProvider'
import './TextEditor.css'
import { ToolBar } from './ToolBar'
export const TextEditor: React.FC = () => {
  const { editorState, setEditorState, state, setState } = useEditor()
  const [focus, setFocus] = useState(false)

  // focus
  const editorRef = useRef<Editor>(null)
  const focusRef = useCallback(() => {
    if (editorRef.current) {
      // console.log(editorRef.current)
      editorRef.current.focus()
    }
  }, [editorRef])

  // useLocalStorage
  const SaveState = () => {
    const content = editorState.getCurrentContent()
    setState(JSON.stringify(convertToRaw(content)))
  }
  const LoadState = () => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(state)))
    )
  }

  // Key Command
  const _handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    } else {
      return 'not-handled'
    }
  }

  // handle TAB
  const _handleKeyBindingFn = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const blockType = RichUtils.getCurrentBlockType(editorState)

      if (
        blockType === 'ordered-list-item' ||
        blockType === 'unordered-list-item'
      ) {
        console.log('handle: Tab on List !!!')
        setEditorState(RichUtils.onTab(e, editorState, 4))
      } else {
        // handle all blockType
        // const tabCharactor = '    '
        const tabCharactor = '\t'
        const newContentState = Modifier.replaceText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          tabCharactor
        )
        setEditorState(
          EditorState.push(editorState, newContentState, 'change-inline-style')
        )
      }

      // return 'Tab'
      return 'Tab'
    }
    return getDefaultKeyBinding(e)
  }

  return (
    <div className="wrap-editor">
      <p>focus: {JSON.stringify(focus)}</p>
      <div style={{ margin: '1rem 0 1rem 0' }}>
        <button onClick={SaveState}>Save</button>
        <button onClick={LoadState}>Load</button>
      </div>
      <ToolBar />
      <div
        className={focus ? 'focus' : 'editor'}
        onClick={focusRef}
        style={{ marginTop: '1rem' }}
      >
        <Editor
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={_handleKeyCommand}
          keyBindingFn={_handleKeyBindingFn}
        />
      </div>
      <DebugPreview />
    </div>
  )
}

const DebugPreview = () => {
  const { editorState } = useEditor()
  return (
    <>
      <pre className="preview">
        entityMap:
        {JSON.stringify(
          convertToRaw(editorState.getCurrentContent()).entityMap,
          null,
          2
        )}
      </pre>
      <pre className="preview">
        blocks:
        {JSON.stringify(
          convertToRaw(editorState.getCurrentContent()).blocks,
          null,
          2
        )}
      </pre>
    </>
  )
}
