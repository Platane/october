import { createSelector } from 'reselect'

import { createPrivateKey, createPublicKey } from '~/service/crypto'

import { selectCurrentSafeId } from './safe'

import type { State } from '../reducer'
import type { ID } from '~/type'

export const selectUserIdentity = (state: State) => ({ name: 'tim' })

export const selectCurrentUserPublicKey = createSelector(
  selectCurrentSafeId,
  state => state.safe.keysBySafeId,

  (safeId, keysBySafeId) => keysBySafeId[safeId] || null
)
export const selectCurrentUser = createSelector(
  selectCurrentUserPublicKey,
  selectUserIdentity,

  (publicKey, x) => (publicKey ? { ...x, publicKey } : null)
)
