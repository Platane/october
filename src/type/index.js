export opaque type ID = string
export type Date = string

import type { PublicKey, PrivateKey } from '~/service/crypto'
export type { PublicKey, PrivateKey } from '~/service/crypto'

export type User = {
  name: string,
  publicKey: PublicKey,
}

export type Transaction = {
  id: ID,

  createdDate: Date,
  executedDate: Date,

  createdBy: User,

  from: User[],
  to: User[],

  amount: number,

  message: string,
}

export type Safe = {
  id: ID,
  name: string,
  users: User[],
  transactions: Transaction[],
}
