import type { User, PrivateKey, PublicKey, Safe, ID } from '~/type'

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
      mutationKey: ID,
      name: string,
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
