import { connect } from 'react-redux'
import { App as Dumb } from './Dumb'
import { withCssReset } from '~/component/_abstract/cssReset'

const injectState = connect(state => ({
  router: state.router,
}))

export const App = withCssReset(injectState(Dumb))
