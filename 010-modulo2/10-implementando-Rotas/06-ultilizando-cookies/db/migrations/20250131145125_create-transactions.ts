import type { Knex } from "knex";
import { Schema } from "zod";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary()
        table.text('title').notNullable()
        table.decimal('amount', 10,2).notNullable()
        table.text('description').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.uuid('sessionId').after('id').index()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}

