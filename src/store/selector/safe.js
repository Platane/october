import { createSelector } from 'reselect'

import type { State } from '../reducer'

export const selectCurrentSafeId = (state: State) =>
  state.router.param.safeId || null

export const selectCurrentSafe = createSelector(
  selectCurrentSafeId,
  state => state.safe.safeById,

  (safeId, safeById) => safeById[safeId] || null
)
