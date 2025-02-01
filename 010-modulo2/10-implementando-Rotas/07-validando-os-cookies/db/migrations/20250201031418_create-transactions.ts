import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('description').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.uuid('sessionId').after('id').index()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transacions')
}

