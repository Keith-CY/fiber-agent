import { defineConfig } from 'drizzle-kit'
// import { getDbPath } from './src/db/utils'
// const defaultDbPath = getDbPath()

export default defineConfig({
  dialect: 'postgresql',
  driver: 'pglite',
  schema: './src/db/schema',
  out: 'drizzle',
  dbCredentials: {
    url: 'tmp/database',
  },
})
