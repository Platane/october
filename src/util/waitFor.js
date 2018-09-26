// @flow

import type { State } from '~/store'

/**
 * return a promise which resolve when the condition function return truthly
 */
export const waitFor = (store: any, condition: (state: State) => any) =>
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
