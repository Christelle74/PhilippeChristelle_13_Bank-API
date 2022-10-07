import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'
import App from './App'
import store from "./app/store"
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import {PersistGate} from 'redux-persist/integration/react'

import { persistor } from './app/store'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store= {store}>
       <PersistGate loading={null} persistor ={persistor}> 
          <App />
       </PersistGate> 
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
