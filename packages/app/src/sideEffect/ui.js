import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { App } from '~/component/App'
import type { Store } from '~/store/type'

export const init = (store: Store) => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const donContainer = document.getElementById('app')

  if (donContainer) render(app, donContainer)
}
