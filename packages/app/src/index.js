import 'unfetch/polyfill'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initLocalStorage } from '~/sideEffect/localStorage'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

// init store
const sideEffects = [
  initNavigator,
  initUi,
  initResourceFetcher,
  initLocalStorage,
]

create(sideEffects)
