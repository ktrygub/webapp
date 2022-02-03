import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import decode from 'jwt-decode'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './redux/rootReducer'
import { userLoggedIn } from './redux/actions/auth'
import setAuthorizationHeader from './utils/setAuthorizationHeader'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

if (localStorage.myappJWT) {
  const payload = decode(localStorage.myappJWT)
  const user = {
    token: localStorage.myappJWT,
    email: payload.email,
    isConfirmed: payload.isConfirmed,
  }
  setAuthorizationHeader(localStorage.myappJWT)
  store.dispatch(userLoggedIn(user))
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/build-real-web-app-with-react-by-rem-zolotykh">
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
