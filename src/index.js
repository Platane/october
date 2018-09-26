import 'unfetch/polyfill'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initNavigator } from '~/sideEffect/navigator'

// init store
const sideEffects = [initNavigator, initUi]

create(sideEffects)
