import type {
  User,
  FlatTransaction,
  PrivateKey,
  PublicKey,
  Safe,
  ID,
} from '~/type'

export type Action =
  | {
      type: 'safe:join:start',
      safeId: ID,
      mutationKey: ID,
    }
  | {
      type: 'safe:join:failure',
      safeId: ID,
      mutationKey: ID,
      error: *,
    }
  | {
      type: 'safe:join:success',
      safeId: ID,
      mutationKey: ID,
      safePrivateKey: PrivateKey,
      userPrivateKey: PrivateKey,
      userPublicKey: PublicKey,
    }
  | {
      type: 'safe:create:start',
      safe: Safe,
      mutationKey: ID,
      safePrivateKey: PrivateKey,
      userPrivateKey: PrivateKey,
      userPublicKey: PublicKey,
    }
  | {
      type: 'safe:transaction:create:start',
      transaction: FlatTransaction,
      mutationKey: ID,
      safeId: ID,
    }
  | {
      type: 'safe:transaction:create:success',
      transaction: FlatTransaction,
      mutationKey: ID,
      safeId: ID,
    }
  | {
      type: 'safe:create:success',
      safe: Safe,
      mutationKey: ID,
      safePrivateKey: PrivateKey,
      userPrivateKey: PrivateKey,
      userPublicKey: PublicKey,
    }
  | {
      type: 'safe:get:failure',
      error: *,
    }
  | {
      type: 'safe:get:success',
      safe: Safe,
    }
