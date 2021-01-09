import { createStore, applyMiddleware, compose } from 'redux'
const ReduxThunk = require('redux-thunk').default
import { createLogger } from 'redux-logger'


import root_reducer from './reducers/all'

let initialState = {}
const loggerMiddleware = createLogger()

let store = createStore(
  root_reducer,
  initialState,
  applyMiddleware(ReduxThunk, loggerMiddleware)
)



import * as name from "./rd_store_sections";
import { fetch_items } from './actions/all'




export default store
