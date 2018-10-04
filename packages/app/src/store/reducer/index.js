import { combineReducers } from 'redux'
import { chainReducer } from '~/util/chainReducer'

import type { State as routerState } from './router'
import type { State as safeState } from './safe'

import { reduce as router, defaultState as routerDefaultState } from './router'
import {
  reduce as safe,
  reduceRoot as safeReduceRoot,
  defaultState as safeDefaultState,
} from './safe'

export const reduce = chainReducer(
  combineReducers({
    router,
    safe,
  }),
  safeReduceRoot
)

export type State = {
  router: routerState,
  safe: safeState,
}

export const defaultState: State = {
  router: routerDefaultState,
  safe: safeDefaultState,
}
