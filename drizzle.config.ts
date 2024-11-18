import { defineConfig } from 'drizzle-kit'
import { get_db_path } from './src/db/utils'
const defaultDbPath = get_db_path()

export default defineConfig({
  dialect: 'postgresql',
  driver: 'pglite',
  schema: './src/db/schema',
  out: 'drizzle',
  dbCredentials: {
    url: defaultDbPath,
  },
})
