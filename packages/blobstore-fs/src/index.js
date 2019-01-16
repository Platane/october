import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-body'
import koaCors from 'koa2-cors'
import koaCorsError from 'koa2-cors-error'
import { createTransaction } from './controller/createTransaction'
import { createUser } from './controller/createUser'
import { createSafe } from './controller/createSafe'
import { getSafe } from './controller/getSafe'
import { PORT } from './config'

const logError = err => {
  process.env.NODE_ENV === 'test'
    ? console.error('got error:', err.message)
    : console.error(err)

  return err
}

export const create_ = async () => {
  const app = new koa()

  const router = new koaRouter()

  router
    .get('/status', ctx => {
      ctx.body = 'ok'
    })
    .get('/safe/:safeId', async ctx => {
      ctx.body = await getSafe(ctx.params.safeId)
    })
    .put('/safe/:safeId', async ctx => {
      const { meta, creator } = ctx.request.body

      ctx.body = await createSafe(ctx.params.safeId, meta, creator)
    })
    .put('/safe/:safeId/user', async ctx => {
      const { user } = ctx.request.body

      ctx.body = await createUser(ctx.params.safeId, user)
    })
    .put('/safe/:safeId/transaction', async ctx => {
      const { transaction } = ctx.request.body

      ctx.body = await createTransaction(ctx.params.safeId, transaction)
    })

  app.use(
    koaCors({
      origin: '*',
      headers: ['Authorization', 'Content-Type'],
      methods: ['GET', 'PUT', 'OPTIONS'],
    })
  )
  app.use(koaCorsError())
  app.use(koaBody())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.on('error', logError)

  const server = app.listen(PORT)

  // kill server
  return {
    destroy: () => server.close(),
    url: `http://localhost:${PORT}`,
  }
}

export const create = () =>
  create_().catch(err => {
    logError(err)
    throw err
  })
