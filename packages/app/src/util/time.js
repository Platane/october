export const wait = (delay: number = 0): Promise<void> =>
  new Promise((resolve, reject, onCancel) => {
    const killTimeout = setTimeout(resolve, delay)

    onCancel && onCancel(clearTimeout(killTimeout))
  })

export const throttle = (delay: number = 0) => (fn: Function) => {
  let pending: TimeoutID | null = null

  const exec = () => {
    pending = null
    fn()
  }

  const out = () => {
    if (pending !== null) return

    pending = setTimeout(exec, delay)
  }

  out.cancel = () => pending !== null && clearTimeout(pending)

  return out
}

export const debounce = (delay: number) => (fn: Function) => {
  let pending: TimeoutID | null = null
  let _args = null

  const exec = () => fn(..._args)

  const out = (...args: any) => {
    _args = args
    pending !== null && clearTimeout(pending)
    pending = setTimeout(exec, delay)
  }

  out.cancel = () => pending !== null && clearTimeout(pending)

  return out
}
