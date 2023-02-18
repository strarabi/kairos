import { defineSchema, defineTable, s } from 'convex/schema'

export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.string(),
  }),
  assignment: defineTable({
    class_name: s.string(),
    assignment_name: s.string(),
    due_date: s.bigint(),
    source_url: s.string(),
  }),
})

