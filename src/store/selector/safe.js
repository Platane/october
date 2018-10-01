import { createSelector } from 'reselect'

import type { State } from '../reducer'
import type { ID, FlatSafe, Safe } from '~/type'

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
    safeById[safeId] ? hydrateSafe(safeById[safeId]) : null
)

export const selectCurrentSafePrivateKey = createSelector(
  selectCurrentSafeId,
  state => state.safe.safePrivateKeyById,

  (safeId, safePrivateKeyById) => safePrivateKeyById[safeId] || null
)
