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

test('scenario', async t => {
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

  storeB.dispatch(
    actions.createTransaction(
      'karaoke',
      45,
      [selectCurrentUserPublicKey(storeA.getState())],
      [
        selectCurrentUserPublicKey(storeA.getState()),
        selectCurrentUserPublicKey(storeB.getState()),
      ],
      Date.now()
    )
  )

  await waitFor(
    storeB,
    state => selectCurrentSafe(state).transactions.length > 0
  )

  t.pass('got the transaction created')

  /**
   * join the safe from storeC
   */

  const storeC = create(sideEffects)

  storeC.dispatch(actions.joinSafe(safeId, safePrivateKey))

  const safe = await waitFor(storeC, selectCurrentSafe)

  t.assert(
    safe.transactions.length === 1,
    'got the safe, with the new transaction'
  )

  t.end()
})
