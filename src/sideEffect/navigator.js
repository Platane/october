import {
  createDomNavigator,
  initSideEffect as initRouter,
} from 'declarative-router'

const navigator = createDomNavigator()

export const init = initRouter({ navigator })
