import test from 'tape'
import {
  create,
  actions,
  selectCurrentSafe,
  selectCurrentSafeId,
  selectCurrentSafePrivateKey,
  selectCurrentUserPublicKey,
  selectCurrentSafeShareUrl,
} from '~/store'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'
import url from 'url'
import querystring from 'querystring'

import { waitFor } from '~/util/waitFor'
import type { ID } from '~/type'

const sideEffects = [initResourceFetcher]

test('scenario share-url', async t => {
  /**
   * create a safe from storeA
   */

  const storeA = create(sideEffects)

  storeA.dispatch(actions.createSafe('week end à rome'))

  await waitFor(storeA, selectCurrentSafe)

  t.pass('got the safe created')

  t.assert(selectCurrentSafeShareUrl(storeA.getState()), 'got the url')

  /**
   * join the safe from storeB
   */

  const storeB = create(sideEffects)

  const sharedUrl = url.parse(selectCurrentSafeShareUrl(storeA.getState()))

  storeB.dispatch(
    actions.goTo(
      sharedUrl.path,
      querystring.parse(sharedUrl.query),
      sharedUrl.hash
    )
  )

  await waitFor(storeB, selectCurrentSafe)

  t.pass('got the safe joined')

  t.end()
})
