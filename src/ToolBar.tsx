import { RichUtils } from 'draft-js'
import { useEditor } from './editorProvider'

export const ToolBar = () => {
  const { editorState, setEditorState } = useEditor()
  // text decoration
  const handleBlockClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, inlineStyle))
  }

  const handleToggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }
  const BLOCK_BUTTON = [
    { style: 'header-one', name: 'H1' },
    { style: 'header-two', name: 'H2' },
    { style: 'header-three', name: 'H3' },
    { style: 'header-four', name: 'H4' },
    { style: 'header-five', name: 'H5' },
    { style: 'header-six', name: 'H6' },
    { style: 'ordered-list-item', name: 'Ordered List' },
    { style: 'unordered-list-item', name: 'Unordered List' },
    { style: 'code-block', name: 'Code Block' },
    { style: 'blockquote', name: 'Blockquote' },
    { style: 'text-align-left', name: 'AL' },
    { style: 'text-align-center', name: 'AC' },
    { style: 'text-align-right', name: 'AR' },
  ]
  const INLINE_BUTTON = [
    { style: 'unstyled', name: 'normal' },
    { style: 'BOLD', name: 'B' },
    { style: 'ITALIC', name: 'I' },
    { style: 'UNDERLINE', name: 'U' },
    { style: 'STRIKETHROUGH', name: 'Strike-throught' },
    { style: 'CODE', name: 'Mono space' },
  ]
  return (
    <div>
      <div>
        {BLOCK_BUTTON.map((i) => (
          <button
            key={i.style}
            onMouseDown={(e) => handleBlockClick(e, i.style)}
          >
            {i.name}
          </button>
        ))}
      </div>
      <div>
        {INLINE_BUTTON.map((i) => (
          <button
            key={i.style}
            onMouseDown={(e) => handleToggleClick(e, i.style)}
          >
            {i.name}
          </button>
        ))}
      </div>
    </div>
  )
}
