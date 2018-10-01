import 'unfetch/polyfill'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

// init store
const sideEffects = [initNavigator, initUi, initResourceFetcher]

create(sideEffects)
