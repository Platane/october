import { genUID } from '~/util/uid'
import {
  selectUser,
  selectUserPublicKey,
  selectUserPrivateKey,
} from '~/store/selector'
import * as blobStore from '~/service/blobStoreReader'
import type { PrivateKey, ID } from '~/type'
import type { Action } from './type'

type State = any
export const createSafe = (name: string) => async (
  dispatch: (action: Action) => void,
  getState: () => State
) => {
  const mutationKey = genUID()

  dispatch({
    type: 'safe:create:start',
    name,
    mutationKey,
  })

  const state = getState()

  const user = selectUser(state)
  const privateKey = selectUserPrivateKey(state)

  const { safeId, safePrivateKey } = await blobStore.createSafe(
    user,
    privateKey
  )(name)

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
  })
}

export const joinSafe = (safeId: ID, safePrivateKey: PrivateKey) => ({
  type: 'safe:join',
  safeId,
  safePrivateKey,
})
