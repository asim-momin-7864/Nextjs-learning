import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  // user side
  usersTable: {
    notesTable: r.many.notesTable(),
  },

  // notes
  notesTable: {
    usersTable: r.one.usersTable({
      from: r.notesTable.userId,
      to: r.usersTable.id,
    }),
  },
}));
