import { createRouteResolver, reduce as reduce_ } from 'declarative-router'
import { chainReducer } from '~/util/chainReducer'
import { routes } from './routes'

import type { Action } from '~/store/action/type'

const resolveRoute = createRouteResolver(routes)

export type State = {
  key: string,
  path: string,
  param: { [string]: string },
}

export const defaultState: State = {
  query: {},
  hash: '',
  ...resolveRoute('/'),
}

export const reduceRedirect = (state: State, action: Action) => {
  switch (action.type) {
    case 'safe:create:success':
      return {
        ...state,
        ...resolveRoute(`/safe/${action.safe.id}`),
      }
  }

  return state
}

export const reduce = chainReducer(reduce_(routes), reduceRedirect)
