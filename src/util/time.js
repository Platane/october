export const wait = (delay: number = 0): Promise<void> =>
  new Promise((resolve, reject, onCancel) => {
    const killTimeout = setTimeout(resolve, delay)

    onCancel && onCancel(clearTimeout(killTimeout))
  })

export const throttle = (delay: number = 0) => fn => {
  let pending = null

  const exec = () => {
    pending = null
    fn()
  }

  const out = () => {
    if (pending) return

    pending = setTimeout(exec, delay)
  }

  out.cancel = () => clearTimeout(pending)

  return out
}

export const debounce = (delay: number) => fn => {
  let pending = null
  let _args = null

  const exec = () => fn(..._args)

  const out = (...args) => {
    _args = args
    clearTimeout(pending)
    pending = setTimeout(exec, delay)
  }

  out.cancel = () => clearTimeout(pending)

  return out
}
