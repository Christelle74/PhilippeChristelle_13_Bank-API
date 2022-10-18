import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'
import App from './App'
import store from "./app/store"
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import {PersistGate} from 'redux-persist/integration/react'

import { persistor } from './app/store'
import Loader from './components/Loader'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store= {store}>
       <PersistGate loading={<Loader/>} persistor ={persistor}> 
          <App />
       </PersistGate> 
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
