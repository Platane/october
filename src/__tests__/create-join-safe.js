import test from 'tape'
import { create, actions, selectCurrentSafe } from '~/store'
import { waitFor } from '~/util/waitFor'

test('scenario', async t => {
  const store = create()

  store.dispatch(actions.createSafe('week end à rome'))

  await waitFor(store, selectCurrentSafe)

  t.pass('got the safe')

  t.end()
})
