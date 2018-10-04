import { chainReducer } from '~/util/chainReducer'

import type { FlatSafe, PrivateKey, PublicKey, ID } from '~/type'
import type { Action } from '~/store/action/type'

export type State = {
  safePrivateKeyById: { [safeId: ID]: PrivateKey },

  keysBySafeId: {
    [safeId: ID]: { privateKey: PrivateKey, publicKey: PublicKey },
  },

  safeById: { [safeId: ID]: FlatSafe },
}

export const defaultState: State = {
  safeById: {},
  safePrivateKeyById: {},
  keysBySafeId: {},
}

const reduceLocalStorage = (state: State, action: Action): State => {
  if (action.type === 'localStorage:read' && action.keys)
    return {
      ...state,
      ...action.keys,
    }

  return state
}

const reduceMutation = (state: State, action: Action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'safe:get:success':
      return {
        ...state,
        safeById: {
          ...state.safeById,
          [action.safe.id]: action.safe,
        },
      }

    case 'safe:join:success':
      return {
        ...state,
        safePrivateKeyById: {
          ...state.safePrivateKeyById,
          [action.safeId]: action.safePrivateKey,
        },
        keysBySafeId: {
          ...state.keysBySafeId,
          [action.safeId]: {
            publicKey: action.userPublicKey,
            privateKey: action.userPrivateKey,
          },
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
        keysBySafeId: {
          ...state.keysBySafeId,
          [action.safe.id]: {
            publicKey: action.userPublicKey,
            privateKey: action.userPrivateKey,
          },
        },
      }

    case 'safe:transaction:create:success':
      return {
        ...state,
        safeById: {
          ...state.safeById,
          [action.safeId]: {
            ...state.safeById[action.safeId],
            transactions: [
              ...state.safeById[action.safeId].transactions,
              action.transaction,
            ],
          },
        },
      }
  }

  return state
}

export const reduce = chainReducer(reduceLocalStorage, reduceMutation)
