import test from 'tape'
import {
  create,
  actions,
  selectCurrentSafe,
  selectCurrentSafeId,
  selectCurrentSafePrivateKey,
  selectCurrentUserPublicKey,
} from '~/store'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

import { waitFor } from '~/util/waitFor'
import type { ID } from '~/type'

const sideEffects = [initResourceFetcher]

test('scenario create-join-safe', async t => {
  /**
   * create a safe from storeA
   */

  const storeA = create(sideEffects)

  storeA.dispatch(actions.createSafe('week end à rome'))

  await waitFor(storeA, selectCurrentSafe)

  t.pass('got the safe created')

  /**
   * join the safe from storeB
   */

  const storeB = create(sideEffects)
  const safeId: ID = (selectCurrentSafeId(storeA.getState()): any)
  const safePrivateKey = selectCurrentSafePrivateKey(storeA.getState())

  storeB.dispatch(actions.joinSafe(safeId, safePrivateKey))

  await waitFor(storeB, selectCurrentSafe)

  t.pass('got the safe joined')

  /**
   * create a new transaction from storeB
   */

  const publicKeys = [
    (selectCurrentUserPublicKey(storeA.getState()): any),
    (selectCurrentUserPublicKey(storeB.getState()): any),
  ]

  storeB.dispatch(
    actions.createTransaction(
      'karaoke',
      45,
      [publicKeys[0]],
      [publicKeys[0], publicKeys[1]],
      Date.now()
    )
  )

  await waitFor(storeB, state => {
    const safe = selectCurrentSafe(state)

    return safe && safe.transactions.length > 0
  })

  t.pass('got the transaction created')

  /**
   * join the safe from storeC
   */

  const storeC = create(sideEffects)

  storeC.dispatch(actions.joinSafe(safeId, safePrivateKey))

  const safe: any = await waitFor(storeC, selectCurrentSafe)

  t.assert(
    safe.transactions.length === 1,
    'got the safe, with the new transaction'
  )

  t.end()
})
