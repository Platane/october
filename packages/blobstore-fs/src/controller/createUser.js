import fs from 'fs'
import path from 'path'
import { DATA_DIR } from '../config'

export const createUser = async (safeId: string, user: string) => {
  if (!user) throw { statusCode: 400 }

  const file = path.join(DATA_DIR, safeId, 'users')

  try {
    const content = [
      ...fs
        .readFileSync(file)
        .toString()
        .split('\n'),
      user,
    ].join('\n')
    fs.writeFileSync(file, content)
  } catch (err) {
    if (err.code === 'ENOENT') throw { statusCode: 404 }

    throw err
  }
}
