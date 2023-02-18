import { mutation } from './_generated/server'

export default mutation(async ({ db }, class_name: string, assignment_name: string, due_date: bigint, source_url: string) => {
  const assignment = { class_name, assignment_name, due_date, source_url }
  await db.insert('assignment', assignment)
})