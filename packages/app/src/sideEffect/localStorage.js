import { write, read } from '~/service/localStorage'
import { readLocalStorage } from '~/store/action'
import { debounce } from '~/util/time'

import { createSelector } from 'reselect'

const createPersist = (label, selector) => {
  let persisted = null

  return state => {
    const x = selector(state)

    if (x !== persisted) {
      persisted = x
      write(label, x)
    }
  }
}

const selectKeys = createSelector(
  state => state.safe.safePrivateKeyById,
  state => state.safe.keysBySafeId,
  (safePrivateKeyById, keysBySafeId) => ({
    safePrivateKeyById,
    keysBySafeId,
  })
)

export const init = store => {
  const persistKeys = createPersist('safe-keys', selectKeys)

  const update = () => {
    const state = store.getState()

    persistKeys(state)
  }

  const r = () => {
    const keys = read('safe-keys')

    return { keys: read('safe-keys') }
  }

  const debouncedUpdate = debounce(1000)(update)

  store.dispatch(readLocalStorage(r()))

  debouncedUpdate()

  store.subscribe(debouncedUpdate)
}
