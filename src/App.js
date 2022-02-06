import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AppRouter from './components/AppRouter'
import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {

  React.useEffect(() => {
    document.title = 'Интернет магазин'
  })

  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </div>
  )
}

