import { safeJSONparse } from '~/util/json'

export type PrivateKey = string
export type PublicKey = string
export type Hash = string

export const createPrivateKey = (): PrivateKey =>
  Math.random()
    .toString(16)
    .slice(2)

export const createPublicKey = (privateKey: PrivateKey): PublicKey =>
  'public-' + privateKey

export const sign = (payload: string, privateKey: PrivateKey): string =>
  createPublicKey(privateKey) + '[' + payload + ']'

export const decode = (
  payload: string,
  publicKey: PublicKey
): string | null => {
  if (
    payload.slice(0, publicKey.length) === publicKey &&
    payload[publicKey.length] === '[' &&
    payload[payload.length - 1] === ']'
  )
    return payload.slice(publicKey.length + 1, -1)

  return null
}

export const signObject = (payload: *, publicKey: PrivateKey): string =>
  sign(JSON.stringify(payload), publicKey)

export const decodeObject = (payload: string, publicKey: PublicKey): * =>
  safeJSONparse(decode(payload, publicKey))
