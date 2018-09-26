import {
  sign,
  decode,
  signObject,
  decodeObject,
  createPrivateKey,
  createPublicKey,
} from '~/service/crypto'
import * as blobStore from '~/service/blobStore'

import type { PrivateKey, PublicKey } from '~/service/crypto'
import type { ID, User } from '~/type'

const challenge = 'abcdef'

const createBlob = (safePrivateKey: PrivateKey) => (
  creatorPrivateKey: PrivateKey,
  creatorPublicKey: PublicKey
) => (payload: *) =>
  sign(
    (creatorPublicKey: any) + `.` + signObject(payload, creatorPrivateKey),
    safePrivateKey
  )

const readBlob = (safePrivateKey: PrivateKey) => (payload: *) => {
  const [creatorPublicKey, p] = decode(
    payload,
    createPublicKey(safePrivateKey)
  ).split('.')

  return {
    creatorPublicKey,
    payload: decodeObject(p, (creatorPublicKey: any)),
  }
}

const create = (blobStore: *) => {
  const createSafe = (user: User, privateKey: PrivateKey) => async (
    name: string
  ) => {
    if (decode(sign(challenge, privateKey), user.publicKey) !== challenge)
      throw new Error('keys does not match')

    const safePrivateKey = createPrivateKey()

    const creatorBlob = createBlob(safePrivateKey)(privateKey, user.publicKey)(
      user
    )

    const metaBlob = createBlob(safePrivateKey)(privateKey, user.publicKey)({
      name,
    })

    const safeId: any = await blobStore.createSafe(metaBlob, creatorBlob)

    return { safeId, safePrivateKey }
  }

  const getSafe = async (safeId: ID, safePrivateKey: PrivateKey) => {
    const blob = await blobStore.getSafe(safeId)

    if (!blob) return null

    const users = blob.users.map(userBlob => {
      const { creatorPublicKey, payload } = readBlob(safePrivateKey)(userBlob)

      return {
        ...payload,
        creatorPublicKey,
      }
    })

    const transactions = blob.transactions.map(transactionBlob => {
      const { creatorPublicKey, payload } = readBlob(safePrivateKey)(
        transactionBlob
      )

      return {
        ...payload,
        creatorPublicKey,
      }
    })

    const { creatorPublicKey, payload } = readBlob(safePrivateKey)(blob.meta)

    const safe = {
      ...payload,
      creatorPublicKey,
      users,
      transactions,
    }
  }

  return { createSafe, getSafe }
}

const blobStoreReader = create(blobStore)

module.exports = { ...blobStoreReader, create }
