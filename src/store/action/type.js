import type { User, PrivateKey, Safe, ID } from '~/type'

export type Action =
  | {
      type: 'safe:join',
      safeId: ID,
      safePrivateKey: PrivateKey,
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
    }
