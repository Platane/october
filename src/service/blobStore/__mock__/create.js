import { genUID } from '~/util/uid'
import type { ID, User } from '~/type'
export type Blob = string

opaque type Cursor = string

export type SafeBlob = {
  users: Blob[],
  transactions: Blob[],
  meta: Blob,
}

const wait = (delay = 0) => new Promise(r => setTimeout(r, delay))
const resolve = x => wait(100).then(() => x)

export const create = () => {
  const safeById = {}

  const getSafe = (safeId: ID): Promise<SafeBlob | null> =>
    resolve(safeById[(safeId: any)])

  const createSafe = (safeId: ID, meta: Blob, creator: Blob) => {
    if (safeById[(safeId: any)]) throw new Error(409)

    safeById[(safeId: any)] = {
      users: [creator],
      transactions: [],
      meta: meta,
    }

    return resolve()
  }

  const getTransactions = (safeId: ID) => (cursor: Cursor) =>
    resolve((safeById[(safeId: any)] || {}).transactions)

  const putTransaction = (safeId: ID) => (transaction: Blob) => {
    const safe = safeById[(safeId: any)]

    if (!safe) throw new Error(404)

    safe.transactions.push(transaction)

    return resolve()
  }

  const putUser = (safeId: ID) => (user: Blob) => {
    const safe = safeById[(safeId: any)]

    if (!safe) throw new Error(404)

    safe.users.push(user)

    return resolve()
  }

  return {
    getSafe,
    createSafe,
    getTransactions,
    putTransaction,
    putUser,
  }
}
