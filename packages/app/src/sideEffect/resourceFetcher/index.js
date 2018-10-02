import {
  selectCurrentSafe,
  selectCurrentSafeId,
  selectCurrentSafePrivateKey,
} from '~/store/selector'
import { createSelector } from 'reselect'

import * as safeFetcher from './safe'

const fetchers = [
  //
  safeFetcher,
]

const fetchResource = store => ({ resourceName, key, ...param }) => {
  const fetcher = fetchers.find(x => x.resourceName === resourceName)

  if (!fetcher) throw new Error('unknow resource')

  fetcher.fetch(store)(param)
}

// select resource that need to be fetched
const selectRequired = createSelector(
  selectCurrentSafeId,
  selectCurrentSafe,
  selectCurrentSafePrivateKey,

  (safeId, safe, safePrivateKey) =>
    [
      //
      !safe &&
        safeId &&
        selectCurrentSafePrivateKey && {
          resourceName: 'safe',
          safeId,
          safePrivateKey,
          key: `safe:${safeId}`,
        },
    ].filter(Boolean)
)

export const init = store => {
  const fetching = {}

  const update = async () => {
    const state = store.getState()

    selectRequired(state).forEach(required => {
      if (
        // fetch if ...

        // it's not fetched yet
        !fetching[required.key]
      ) {
        fetching[required.key] = Date.now()

        fetchResource(store)(required)
      }
    })
  }

  update()

  store.subscribe(update)
}
