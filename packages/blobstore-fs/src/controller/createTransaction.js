import fs from 'fs'
import path from 'path'
import { DATA_DIR } from '../config'

export const createTransaction = async (
  safeId: string,
  transaction: string
) => {
  if (!transaction) throw { statusCode: 400 }

  const file = path.join(DATA_DIR, safeId, 'transactions')

  try {
    const content = [
      ...fs
        .readFileSync(file)
        .toString()
        .split('\n'),
      transaction,
    ].join('\n')
    fs.writeFileSync(file, content)
  } catch (err) {
    if (err.code === 'ENOENT') throw { statusCode: 404 }

    throw err
  }
}
