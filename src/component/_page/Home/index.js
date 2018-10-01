import { connect } from 'react-redux'
import { Home as Dumb } from './Dumb'
import { selectSafeList } from '~/store/selector'

const injectState = connect(state => ({
  safes: selectSafeList(state),
}))

export const Home = injectState(Dumb)
