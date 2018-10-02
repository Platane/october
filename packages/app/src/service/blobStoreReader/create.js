import {
  sign,
  decode,
  signObject,
  decodeObject,
  createPrivateKey,
  createPublicKey,
  verifyKey,
} from '~/service/crypto'
import * as blobStore from '~/service/blobStore'

import type { PrivateKey, PublicKey } from '~/service/crypto'
import type { ID, User, FlatTransaction } from '~/type'

const createBlob = (safePrivateKey: PrivateKey) => (
  creatorPrivateKey: PrivateKey,
  creatorPublicKey: PublicKey
) => (payload: *) =>
  sign(
    (creatorPublicKey: any) + `.` + signObject(payload, creatorPrivateKey),
    safePrivateKey
  )

const readBlob = (safePrivateKey: PrivateKey) => (payload: *) => {
  const decoded = decode(payload, createPublicKey(safePrivateKey))

  if (!decoded) return null

  const [creatorPublicKey, p] = decoded.split('.')

  return {
    creatorPublicKey,
    payload: decodeObject(p, (creatorPublicKey: any)),
  }
}

export const create = (blobStore: *) => {
  /**
   * create a safe
   */
  const createSafe = async (
    user: User,
    userPrivateKey: PrivateKey,
    safeId: ID,
    safePrivateKey: PrivateKey,
    safeName: string
  ) => {
    verifyKey(user.publicKey, userPrivateKey)

    const creatorBlob = createBlob(safePrivateKey)(
      userPrivateKey,
      user.publicKey
    )(user)

    const metaBlob = createBlob(safePrivateKey)(userPrivateKey, user.publicKey)(
      { name: safeName }
    )

    await blobStore.createSafe(safeId, metaBlob, creatorBlob)
  }

  /**
   * add an user to an existing safe
   */
  const addUserToSafe = async (
    user: User,
    userPrivateKey: PrivateKey,
    safeId: ID,
    safePrivateKey: PrivateKey
  ) => {
    verifyKey(user.publicKey, userPrivateKey)

    const userBlob = createBlob(safePrivateKey)(userPrivateKey, user.publicKey)(
      user
    )

    await blobStore.putUser(safeId)(userBlob)
  }

  /**
   * add a transaction
   */
  const createTransaction = async (
    userPublicKey: PublicKey,
    userPrivateKey: PrivateKey,
    safeId: ID,
    safePrivateKey: PrivateKey,
    transaction: FlatTransaction
  ) => {
    verifyKey(userPublicKey, userPrivateKey)

    const transactionBlob = createBlob(safePrivateKey)(
      userPrivateKey,
      userPublicKey
    )(transaction)

    await blobStore.putTransaction(safeId)(transactionBlob)
  }

  /**
   * get a safe
   */
  const getSafe = async (safeId: ID, safePrivateKey: PrivateKey) => {
    const blob = await blobStore.getSafe(safeId)

    if (!blob) return null

    // read users
    const users: User[] = blob.users
      .map(userBlob => {
        const { creatorPublicKey, payload } =
          readBlob(safePrivateKey)(userBlob) || {}

        if (!creatorPublicKey) return null

        return ({
          ...payload,
          creatorPublicKey,
        }: any)
      })
      .filter(Boolean)

    // read transactions
    const transactions: FlatTransaction[] = blob.transactions
      .map(transactionBlob => {
        const { creatorPublicKey, payload } =
          readBlob(safePrivateKey)(transactionBlob) || {}

        if (!users.some(u => u.publicKey === creatorPublicKey)) return null

        return ({
          ...payload,
          creatorPublicKey,
        }: any)
      })
      .filter(Boolean)

    // read read safe meta
    const { creatorPublicKey, payload } =
      readBlob(safePrivateKey)(blob.meta) || {}

    if (!creatorPublicKey) return null

    const safe = {
      ...payload,
      id: safeId,
      creatorPublicKey,
      users,
      transactions,
    }

    return safe
  }

  return { createSafe, addUserToSafe, createTransaction, getSafe }
}
