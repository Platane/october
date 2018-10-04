import { createSelector } from 'reselect'

import { APP_ORIGIN } from '~/config'

import type { State } from '../reducer'
import type { ID, FlatSafe, Safe, PrivateKey } from '~/type'

const hydrateSafe = ({ users, transactions, ...rest }: FlatSafe): Safe =>
  ({
    ...rest,
    users,
    transactions: transactions.map(t => ({
      ...t,
      createdBy: users.find(x => x.publicKey === t.createdBy),
      to: t.to.map(userId => users.find(x => x.publicKey === userId)),
      from: t.from.map(userId => users.find(x => x.publicKey === userId)),
    })),
  }: any)

export const selectCurrentSafeId = (state: State): ID | null =>
  (state.router.param.safeId: any) || null

export const selectCurrentSafe = createSelector(
  selectCurrentSafeId,
  state => state.safe.safeById,

  (safeId, safeById) =>
    safeId && safeById[safeId] ? hydrateSafe(safeById[safeId]) : null
)

export const selectSafeList = createSelector(
  state => state.safe.safePrivateKeyById,

  safePrivateKeyById => Object.keys(safePrivateKeyById).map(id => ({ id }))
)

export const selectCurrentSafePrivateKey = createSelector(
  selectCurrentSafeId,
  state => state.safe.safePrivateKeyById,

  (safeId, safePrivateKeyById) => safePrivateKeyById[(safeId: any)]
)

export const selectCurrentSafeShareUrl = createSelector(
  selectCurrentSafeId,
  selectCurrentSafePrivateKey,

  (safeId, safePrivateKeyById) =>
    safeId &&
    safePrivateKeyById &&
    `${APP_ORIGIN}/safe/${safeId}#privateKey=${safePrivateKeyById}`
)
