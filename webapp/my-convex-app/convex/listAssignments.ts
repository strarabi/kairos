import { query } from './_generated/server'
import { Document } from './_generated/dataModel'

export default query(async ({ db }): Promise<Document<'assignment'>[]> => {
  return await db.query('assignment').order("asc").collect()
})

