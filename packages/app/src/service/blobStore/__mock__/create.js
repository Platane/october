import { genUID } from '~/util/uid'
import type { ID, User } from '~/type'
import type { Cursor, Blob, SafeBlob } from '../type'

import * as api from '../index'

type API = typeof api

const wait = (delay = 0) => new Promise(r => setTimeout(r, delay))
const resolve = <T>(x: T): Promise<T> => wait(100).then(() => x)

export const create = (): API => {
  const safeById = {}

  const getSafe = (safeId: ID) => resolve(safeById[(safeId: any)] || null)

  const createSafe = (safeId: ID, meta: Blob, creator: Blob) => {
    if (safeById[(safeId: any)]) throw new Error(409)

    safeById[(safeId: any)] = {
      users: [creator],
      transactions: [],
      meta: meta,
    }

    return resolve()
  }

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
    putTransaction,
    putUser,
  }
}
