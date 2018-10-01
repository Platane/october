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
import type { ID, User, Transaction } from '~/type'

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

const create = (blobStore: *) => {
  /**
   * create a safe
   */
  const createSafe = async (
    user: User,
    userPrivateKey: PrivateKey,
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

    const safeId = await blobStore.createSafe(metaBlob, creatorBlob)

    return safeId
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
    const transactions: Transaction[] = blob.transactions
      .map(transactionBlob => {
        const { creatorPublicKey, payload } =
          readBlob(safePrivateKey)(transactionBlob) || {}

        if (
          !creatorPublicKey ||
          users.some(u => u.publicKey === creatorPublicKey)
        )
          return null

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

  return { createSafe, addUserToSafe, getSafe }
}

const blobStoreReader = create(blobStore)

module.exports = { ...blobStoreReader, create }
