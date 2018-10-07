import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { CreateTransaction as Dumb } from './Dumb'
import { actions, selectCurrentSafeUsers } from '~/store'
import { withFormState } from './withFormState'

import type { State } from '~/store/type'

const selectUsersAsOptions = createSelector(
  selectCurrentSafeUsers,

  users => (users ? users.map(u => ({ id: u.publicKey, label: u.name })) : [])
)

const injectState = connect(
  (state: State) => ({ users: selectUsersAsOptions(state) }),
  { createTransaction: actions.createTransaction }
)

export const CreateTransaction = injectState(withFormState(Dumb))
