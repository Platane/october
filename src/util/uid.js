import type { ID } from '~/type'

export const genUID = (): ID =>
  (Math.random()
    .toString(34)
    .slice(2, 8): any)
