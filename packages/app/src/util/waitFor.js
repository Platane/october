// @flow

import type { Store } from 'redux'

/**
 * return a promise which resolve when the condition function return truthly
 */
export const waitFor = <State, T>(
  store: Store<State, *, *>,
  condition: (state: State) => T
): Promise<T> =>
  new Promise(resolve => {
    let unsubscribe

    const check = () => {
      const res = condition(store.getState())
      if (res) {
        unsubscribe()
        resolve(res)
      }
    }

    unsubscribe = store.subscribe(check)

    check()
  })
