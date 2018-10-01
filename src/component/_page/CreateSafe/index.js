import { connect } from 'react-redux'
import { CreateSafe as Dumb } from './Dumb'
import { selectSafeList } from '~/store'
import { actions } from '~/store'
import { withFormState } from './withFormState'

const injectState = connect(
  null,
  { createSafe: actions.createSafe }
)

export const CreateSafe = injectState(withFormState(Dumb))
