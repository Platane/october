import { genUID } from '~/util/uid'
import { selectUserIdentity } from '~/store/selector'
import { createPrivateKey, createPublicKey } from '~/service/crypto'
import * as blobStore from '~/service/blobStoreReader'
import type { PrivateKey, ID } from '~/type'
import type { Action } from './type'

type State = any
export const createSafe = (name: string) => async (
  dispatch: (action: Action) => void,
  getState: () => State
) => {
  const mutationKey = genUID()
  const safeId = genUID()

  const state = getState()

  // generate some keys
  const safePrivateKey = createPrivateKey()

  const userPrivateKey = createPrivateKey()
  const userPublicKey = createPublicKey(userPrivateKey)

  // create the user
  const user = {
    ...selectUserIdentity(state),
    publicKey: userPublicKey,
  }

  dispatch({
    type: 'safe:create:start',
    safe: {
      name,
      id: safeId,
      creator: user,
      users: [user],
      transactions: [],
    },
    mutationKey,
    safePrivateKey,
    userPublicKey,
    userPrivateKey,
  })

  await blobStore.createSafe(user, userPrivateKey, safeId, safePrivateKey, name)

  dispatch({
    type: 'safe:create:success',
    safe: {
      name,
      id: safeId,
      creator: user,
      users: [user],
      transactions: [],
    },
    mutationKey,
    safePrivateKey,
    userPublicKey,
    userPrivateKey,
  })
}

export const joinSafe = (safeId: ID, safePrivateKey: PrivateKey) => async (
  dispatch: (action: Action) => void,
  getState: () => State
) => {
  const mutationKey = genUID()

  const state = getState()

  const keys = state.safe.keysBySafeId[safeId]

  if (keys) {
    dispatch({
      type: 'safe:join:failure',
      safeId,
      mutationKey,
      error: new Error('409 - user already joined'),
    })
  } else {
    dispatch({
      type: 'safe:join:start',
      safeId,
      mutationKey,
    })

    // generate some keys
    const userPrivateKey = createPrivateKey()
    const userPublicKey = createPublicKey(userPrivateKey)

    // create the user
    const user = {
      ...selectUserIdentity(state),
      publicKey: userPublicKey,
    }

    await blobStore.addUserToSafe(user, userPrivateKey, safeId, safePrivateKey)

    dispatch({
      type: 'safe:join:success',
      safeId,
      mutationKey,
      safePrivateKey,
      userPrivateKey,
      userPublicKey,
    })
  }
}
