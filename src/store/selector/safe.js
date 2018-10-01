import { createSelector } from 'reselect'

import type { State } from '../reducer'
import type { ID } from '~/type'

export const selectCurrentSafeId = (state: State): ID | null =>
  (state.router.param.safeId: any) || null

export const selectCurrentSafe = createSelector(
  selectCurrentSafeId,
  state => state.safe.safeById,

  (safeId, safeById) => safeById[safeId] || null
)

export const selectCurrentSafePrivateKey = createSelector(
  selectCurrentSafeId,
  state => state.safe.safePrivateKeyById,

  (safeId, safePrivateKeyById) => safePrivateKeyById[safeId] || null
)
