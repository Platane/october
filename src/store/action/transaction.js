import { genUID } from '~/util/uid'
import {
  selectCurrentUserKeys,
  selectUserIdentity,
  selectCurrentSafeId,
  selectCurrentSafePrivateKey,
} from '~/store/selector'
import { createPrivateKey, createPublicKey } from '~/service/crypto'
import * as blobStore from '~/service/blobStoreReader'
import type { PrivateKey, ID } from '~/type'
import type { Action } from './type'

type State = any
export const createTransaction = (
  message: string,
  amount: number,
  from: ID[],
  to: ID[],
  executedDate: number
) => async (dispatch: (action: Action) => void, getState: () => State) => {
  const mutationKey = genUID()
  const id = genUID()

  const createdDate = Date.now()

  const state = getState()

  const safeId = selectCurrentSafeId(state)
  const safePrivateKey = selectCurrentSafePrivateKey(state)

  const keys = selectCurrentUserKeys(state)

  if (!keys || !safeId || !safePrivateKey) return

  const transaction = {
    id,
    createdBy: keys.publicKey,
    message,
    amount,
    from,
    to,
    executedDate,
    createdDate,
  }

  dispatch({
    type: 'safe:transaction:create:start',
    transaction,
    mutationKey,
    safeId,
  })

  await blobStore.createTransaction(
    keys.publicKey,
    keys.privateKey,
    safeId,
    safePrivateKey,
    transaction
  )

  dispatch({
    type: 'safe:transaction:create:success',
    transaction,
    mutationKey,
    safeId,
  })
}
