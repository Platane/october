export * from './__mock__'
export type * from './__mock__'

import { decode, sign } from './__mock__'
import type { PublicKey, PrivateKey } from './__mock__'

const challenge = 'abcdef'

export const verifyKey = (publicKey: PublicKey, privateKey: PrivateKey) => {
  if (decode(sign(challenge, privateKey), publicKey) !== challenge)
    throw new Error('keys does not match')
}
