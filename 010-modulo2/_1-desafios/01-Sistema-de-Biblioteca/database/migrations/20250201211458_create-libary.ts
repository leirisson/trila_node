import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('book', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.text('autor').notNullable()
    table.text('isbn').notNullable()
    table.text('year_publication').notNullable()
    table.text('summary')
    table.uuid('session_id').after('id').index()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('book')
}

