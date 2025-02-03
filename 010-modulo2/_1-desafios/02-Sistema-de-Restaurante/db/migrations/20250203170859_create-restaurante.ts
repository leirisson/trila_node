import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('pratos', (table) => {
        table.uuid('id').primary()
        table.text('nome').notNullable()
        table.decimal('preco').notNullable()
        table.text('ingredientes').notNullable()
        table.text('categoria').notNullable()
        table.uuid('session_id').after('id').index()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('pratos')
}

