import { combineReducers } from 'redux'

import type { State as routerState } from './router'
import type { State as safeState } from './safe'

import { reduce as router, defaultState as routerDefaultState } from './router'
import { reduce as safe, defaultState as safeDefaultState } from './safe'

export const reduce = combineReducers({
  router,
  safe,
})

export type State = {
  router: routerState,
  safe: safeState,
}

export const defaultState: State = {
  router: routerDefaultState,
  safe: safeDefaultState,
}
