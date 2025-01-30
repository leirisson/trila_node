import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount').notNullable()
    table.timestamp('creted_at').defaultTo(knex.fn.now()).notNullable()
    table.uuid('session_id').after('id').index()
  })
}


export async function down(knex: Knex): Promise<void> {
await knex.schema.dropTable('transactions')
}

