export * as actions from './action'
export * from './selector'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reduce, defaultState } from './reducer'
import { middleware as crashReporterMiddleware } from './middleware/crashReporter'
import thunkMiddleware from 'redux-thunk'

import type { State, Action } from './type'
import type { Reducer } from 'redux'

export const create = (sideEffects = []) => {
  // middlewares composing
  const middlewares = [thunkMiddleware, crashReporterMiddleware]

  // enhancers composing
  const enhancers = [applyMiddleware(...middlewares)]

  if ('undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__)
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())

  const enhancer = compose(...enhancers)

  const initState = defaultState

  const store = createStore(
    (reduce: Reducer<State, Action>),
    initState,
    enhancer
  )

  sideEffects.forEach(init => init(store))

  return store
}
