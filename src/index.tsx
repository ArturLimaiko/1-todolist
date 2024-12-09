import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './state/state'
import { AppHttpRequests } from 'app/AppHttpRequests'
import { App } from 'app/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
    {/*<AppHttpRequests />*/}
  </Provider>,
)

//Provider связывает реакт и редакс обязательный параметр просит - объект типа стор
