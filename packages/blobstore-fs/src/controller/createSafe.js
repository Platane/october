import fs from 'fs'
import path from 'path'
import { DATA_DIR } from '../config'

export const createSafe = async (
  safeId: string,
  meta: string,
  creator: string
) => {
  if (!meta || !creator) throw { statusCode: 400 }

  const dir = path.join(DATA_DIR, safeId)

  try {
    fs.mkdirSync(dir)
  } catch (err) {
    console.log(err)
    throw err
  }

  fs.writeFileSync(path.join(dir, 'meta'), meta)
  fs.writeFileSync(path.join(dir, 'users'), creator)
  fs.writeFileSync(path.join(dir, 'transactions'), '')
}
