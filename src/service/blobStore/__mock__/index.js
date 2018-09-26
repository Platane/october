import { genUID } from '~/util/uid'
import type { ID, User } from '~/type'
export type Blob = string

opaque type Cursor = string

const wait = (delay = 0) => new Promise(r => setTimeout(r, delay))
const resolve = x => wait(100).then(() => x)

const create = () => {
  const safeById = {}

  const getSafe = (safeId: ID) => resolve(safeById[(safeId: any)])

  const createSafe = (meta: Blob, creator: Blob) => {
    const safeId = genUID()

    safeById[(safeId: any)] = {
      users: [creator],
      transactions: [],
      meta: meta,
    }

    return resolve(safeId)
  }

  const getTransactions = (safeId: ID) => (cursor: Cursor) =>
    resolve((safeById[(safeId: any)] || {}).transactions)

  const putTransaction = (safeId: string) => (transaction: Blob) => {
    const safe = safeById[(safeId: any)]

    if (!safe) throw new Error(404)

    safe.transactions.push(transaction)

    return resolve()
  }

  const putUser = (safeId: string) => (user: Blob) => {
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

const blobStore = create()

module.exports = { ...blobStore, create }
