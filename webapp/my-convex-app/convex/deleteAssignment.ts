import { mutation } from './_generated/server'
import { GenericId } from 'convex/values'

export default mutation(async ({ db }, id: GenericId<"assignment">) => {
  await db.delete(id)
})
