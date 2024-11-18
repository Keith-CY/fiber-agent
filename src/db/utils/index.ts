import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import { APP_NAME, TMP_DB_PATH } from '../../common'

export const get_db_path = (appName: string = APP_NAME): string => {
  if (process.env['NODE_ENV'] !== 'production') return TMP_DB_PATH
  const home_dir = os.homedir()
  let db_path: string
  switch (process.platform) {
    case 'win32': {
      db_path = path.join(home_dir, 'AppData', 'Roaming', appName)
      break
    }
    case 'darwin': {
      db_path = path.join(home_dir, 'Library', 'Application Support', appName)
      break
    }
    default: {
      db_path = path.join(home_dir, `.${appName}`)
    }
  }
  if (!fs.existsSync(db_path)) {
    fs.mkdirSync(db_path, { recursive: true })
  }

  const DB_NAME = 'pglite.db'

  return path.join(db_path, DB_NAME)
}
