import fs from 'fs'
import path from 'path'
import { DATA_DIR } from '../config'

export const getSafe = async (safeId: string) => {
  const dir = path.join(DATA_DIR, safeId)

  try {
    const meta = fs.readFileSync(path.join(dir, 'meta')).toString()
    const users = fs
      .readFileSync(path.join(dir, 'users'))
      .toString()
      .split('\n')
      .filter(Boolean)
    const transactions = fs
      .readFileSync(path.join(dir, 'transactions'))
      .toString()
      .split('\n')
      .filter(Boolean)

    return {
      meta,
      users,
      transactions,
    }
  } catch (err) {
    if (err.code === 'ENOENT') throw { statusCode: 404 }

    throw err
  }
}
