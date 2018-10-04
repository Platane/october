import { connect } from 'react-redux'
import { ShareSafe as Dumb } from './Dumb'
import { selectCurrentSafeShareUrl } from '~/store/selector'

const injectState = connect(state => ({
  shareUrl: selectCurrentSafeShareUrl(state),
}))

export const ShareSafe = injectState(Dumb)
