import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('app'))
root.render(<App />)
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
// ReactDOM.render(<App />, document.getElementById('app'))