export const chainReducer = <State, Action>(
  ...reducers: Array<(state: State, action: Action, state0: State) => State>
) => (state0: State, action: Action): State =>
  reducers.reduce((state, reducer) => reducer(state, action, state0), state0)
