export const middleware = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    err.action = action
    throw err
  }
}
