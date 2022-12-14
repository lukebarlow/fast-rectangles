import React from 'react'
import { createRoot } from 'react-dom/client'
import ExamplePage from './ExamplePage'

export default function rootRender(content: React.ReactNode, pages: string[]) {
  const container = document.getElementById('root')
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <ExamplePage pages={pages}>
        {content}
      </ExamplePage>
    </React.StrictMode>
  )
}