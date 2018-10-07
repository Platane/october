import {
  createDomNavigator,
  initSideEffect as initRouter,
} from 'declarative-router'
import { APP_BASENAME } from '~/config'

const navigator = createDomNavigator({ pathPrefix: APP_BASENAME })

export const init = initRouter({ navigator })
