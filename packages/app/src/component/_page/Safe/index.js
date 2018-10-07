import { connect } from 'react-redux'
import { Safe as Dumb } from './Dumb'
import { selectCurrentSafe } from '~/store/selector'

const injectState = connect(state => ({
  safe: selectCurrentSafe(state),
}))

export const Safe = injectState(Dumb)
