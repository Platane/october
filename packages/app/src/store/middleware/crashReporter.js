import type { Middleware } from 'redux'

export const middleware: Middleware<*, *, *> = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    err.action = action
    throw err
  }
}
