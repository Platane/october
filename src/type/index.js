export opaque type ID = string
export type Date = number

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

export type FlatTransaction = {
  id: ID,

  createdDate: Date,
  executedDate: Date,

  createdBy: ID,

  from: ID[],
  to: ID[],

  amount: number,

  message: string,
}

export type Safe = {
  id: ID,
  name: string,
  users: User[],
  transactions: Transaction[],
}

export type FlatSafe = {
  id: ID,
  name: string,
  users: User[],
  transactions: FlatTransaction[],
}
