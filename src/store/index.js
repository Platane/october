export * as actions from './action'
export * from './selector'

export type { State } from './reducer'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { reduce, defaultState } from './reducer'

import { middleware as crashReporterMiddleware } from './middleware/crashReporter'
import thunkMiddleware from 'redux-thunk'

export const create = (sideEffects = []) => {
  const middlewares = [thunkMiddleware, crashReporterMiddleware]

  // enhancers composing
  const enhancers = [
    applyMiddleware(...middlewares),
    'undefined' != typeof window &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ].filter(Boolean)

  const store = createStore(reduce, defaultState, compose(...enhancers))

  sideEffects.forEach(init => init(store))

  return store
}
