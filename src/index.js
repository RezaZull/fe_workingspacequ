import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './utils/store'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
)
