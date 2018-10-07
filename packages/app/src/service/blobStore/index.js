import { genUID } from '~/util/uid'
import { BLOBSTORE_ENDPOINT } from '~/config'
import type { ID, User } from '~/type'
import type { Blob, SafeBlob } from './type'

import fetch from '~/service/fetch'

export const getSafe = (safeId: ID): Promise<SafeBlob | null> =>
  fetch(`${BLOBSTORE_ENDPOINT}/safe/${safeId}`)

export const createSafe = (
  safeId: ID,
  meta: Blob,
  creator: Blob
): Promise<void> =>
  fetch(`${BLOBSTORE_ENDPOINT}/safe/${safeId}`, {
    method: 'PUT',
    body: { meta, creator },
  })

export const putTransaction = (safeId: ID) => (
  transaction: Blob
): Promise<void> =>
  fetch(`${BLOBSTORE_ENDPOINT}/safe/${safeId}/transaction`, {
    method: 'PUT',
    body: { transaction },
  })

export const putUser = (safeId: ID) => (user: Blob): Promise<void> =>
  fetch(`${BLOBSTORE_ENDPOINT}/safe/${safeId}/user`, {
    method: 'PUT',
    body: { user },
  })
