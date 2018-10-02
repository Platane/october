import * as blobStore from '~/service/blobStoreReader'

export const resourceName = 'safe'

export const fetch = store => async ({ safeId, safePrivateKey }) => {
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
