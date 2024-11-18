import { migrate } from 'drizzle-orm/pglite/migrator'
import { Database } from '../src/db'

const main = async () => {
  await migrate(Database.db, {
    migrationsFolder: 'drizzle',
  })

  console.info('Migration complete')
}

main()
