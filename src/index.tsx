import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { EditorProvider } from './editorProvider'

ReactDOM.render(
  <React.StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
