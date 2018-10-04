import * as blobStore from '~/service/blobStoreReader'

import type { State, Store } from '~/store/type'
import type { ID, PrivateKey } from '~/type'

export const resourceName = 'safe'

type Param = { safeId: ID, safePrivateKey: PrivateKey }

export const fetch = (store: Store) => async ({
  safeId,
  safePrivateKey,
}: Param) => {
  const safe = await blobStore.getSafe(safeId, safePrivateKey)

  if (!safe)
    return store.dispatch({
      type: 'safe:get:failure',
      error: new Error('404 - somehow not found'),
    })

  store.dispatch({
    type: 'safe:get:success',
    safe,
  })
}
