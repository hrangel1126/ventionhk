import { column, defineDb, defineTable, NOW } from 'astro:db';

export const Board = defineTable({
    columns: {
        id: column.number({primaryKey: true}),
        name: column.text(),
        message: column.text(), 
        created_at: column.date({ default: NOW }),
    },
});

export default defineDb({
 tables: {
  Board,
 },
});