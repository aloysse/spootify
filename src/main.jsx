import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reducer,{ initailState } from './utils/reducer'
import  { StateProvider } from './utils/StateProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <StateProvider  initailState={initailState} reducer={reducer}>
    <App />
    </StateProvider>
  // </React.StrictMode>,
)
