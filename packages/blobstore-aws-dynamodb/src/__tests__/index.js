import test from 'tape'
import { apiGatewayEvent } from '../__fixtures__/apiGatewayEvent'
import { handler } from '../index'

const safeId =
  'test-' +
  Math.random()
    .toString()
    .slice(2)

test(' PUT - /safe/:safeId', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/${safeId}`,
    body: JSON.stringify({ creator: 'ccc', meta: 'ccc' }),
    httpMethod: 'PUT',
  }

  const res = await handler(event)

  t.assert(res.statusCode === 200, 'status code ok')

  t.end()
})

test(' PUT - /safe/:safeId, should fail if the id already exist', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/${safeId}`,
    body: JSON.stringify({ creator: 'ccc', meta: 'ccc' }),
    httpMethod: 'PUT',
  }

  const res = await handler(event)

  t.assert(res.statusCode != 200, 'status code not ok')

  t.end()
})

test(' GET - /safe/:safeId', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/${safeId}`,
    httpMethod: 'GET',
  }

  const res = await handler(event)

  t.assert(res.statusCode === 200, 'status code ok')

  t.assert(!!res.body.id, 'looks like a safe')

  t.end()
})

test(' GET - /safe/:safeId, should fail if the safe does not exists', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/unknow`,
    httpMethod: 'GET',
  }

  const res = await handler(event)

  t.assert(res.statusCode === 404, 'status code not ok')

  t.end()
})

test(' PUT - /safe/:safeId/user', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/${safeId}/user`,
    body: JSON.stringify({ user: 'uuuu' }),
    httpMethod: 'PUT',
  }

  const res = await handler(event)

  t.assert(res.statusCode === 200, 'status code ok')

  {
    const event = {
      ...apiGatewayEvent,
      path: `/safe/${safeId}`,
      httpMethod: 'GET',
    }

    const res = await handler(event)

    t.assert(res.body.users.includes('uuuu'), 'should have the user registred')
  }

  t.end()
})

test(' PUT - /safe/:safeId/user, consistency check', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/${safeId}/user`,
    body: JSON.stringify({ user: 'uuuu' }),
    httpMethod: 'PUT',
  }

  const res = [
    await handler(event),
    await handler(event),
    await handler(event),

    ...(await Promise.all(
      Array.from({ length: 30 }).map(() => handler(event))
    )),
  ]

  t.assert(
    res.some(x => x.statusCode !== 200),
    'some request should have failed'
  )

  t.end()
})

test(' PUT - /safe/:safeId/transaction', async t => {
  const event = {
    ...apiGatewayEvent,
    path: `/safe/${safeId}/transaction`,
    body: JSON.stringify({ transaction: 'uuuu' }),
    httpMethod: 'PUT',
  }

  const res = await handler(event)

  t.assert(res.statusCode === 200, 'status code ok')

  {
    const event = {
      ...apiGatewayEvent,
      path: `/safe/${safeId}`,
      httpMethod: 'GET',
    }

    const res = await handler(event)

    t.assert(
      res.body.transactions.includes('uuuu'),
      'should have the transaction registred'
    )
  }
  t.end()
})
