import type { Safe, PrivateKey, ID } from '~/type'
import type { Action } from '~/store/action/type'

export type State = {
  safePrivateKeyById: { [safeId: PrivateKey]: Safe },

  safeById: { [safeId: ID]: Safe },
}

export const defaultState: State = { safeById: {}, safePrivateKeyById: {} }

export const reduce = (state: State, action: Action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'safe:join':
      return {
        ...state,
        safePrivateKeyById: {
          ...state.safePrivateKeyById,
          [action.safeId]: action.safePrivateKey,
        },
      }

    case 'safe:create:success':
      return {
        ...state,
        safeById: {
          ...state.safeById,
          [action.safe.id]: action.safe,
        },
        safePrivateKeyById: {
          ...state.safePrivateKeyById,
          [action.safe.id]: action.safePrivateKey,
        },
      }
  }

  return state
}
