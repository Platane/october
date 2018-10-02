import test from 'tape'
import {
  createPrivateKey,
  createPublicKey,
  sign,
  decode,
  decodeObject,
  signObject,
} from '../index'

test('crypto', t => {
  const privateKey = createPrivateKey()
  const publicKey = createPublicKey(privateKey)

  const message = 'hello'

  const cryptedMessage = sign(message, privateKey)

  t.equal(
    decode(cryptedMessage, publicKey),
    message,
    'with public key, decode should retreive the message cryped with privateKey'
  )

  t.equal(
    decode(cryptedMessage, ('xxxx': any)),
    null,
    'without public key, decode should not retreive the message cryped with privateKey'
  )

  t.deepEqual(
    decode(sign('hello', privateKey), publicKey),
    'hello',
    'should sign / decode string'
  )

  t.deepEqual(
    decodeObject(signObject({ a: 'hello' }, privateKey), publicKey),
    { a: 'hello' },
    'should sign / decode object'
  )

  t.end()
})
