import { createSelector } from 'reselect'

import { createPrivateKey, createPublicKey } from '~/service/crypto'

import type { State } from '../reducer'

const privateKey = createPrivateKey()
const publicKey = createPublicKey(privateKey)

export const selectUserPublicKey = (state: State) => publicKey
export const selectUserPrivateKey = (state: State) => privateKey
export const selectUser = (state: State) => ({ name: 'tim', publicKey })
