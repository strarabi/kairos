import { mutation } from './_generated/server'
import { GenericId } from 'convex/values'

export default mutation(async ({ db }, id: GenericId<"assignment">, class_name: string, assignment_name: string, due_date: bigint, source_url: string) => {
  const assignment = { class_name, assignment_name, due_date, source_url }
  await db.replace(id, assignment)
})
