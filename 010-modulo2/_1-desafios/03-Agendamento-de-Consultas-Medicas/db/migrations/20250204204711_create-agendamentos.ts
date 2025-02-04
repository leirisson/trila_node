import type { Knex } from "knex";


// Campos: ID, paciente, médico, data e hora, status (agendado, finalizado, cancelado).
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('consultas', (table) => {
        table.uuid('id').primary()
        table.text('nome').notNullable()
        table.text('medico').notNullable()
        table.timestamp('data_agendamento').notNullable()
        table.text('status').notNullable()
        table.uuid('session_id').after('id').index()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
await knex.schema.dropTable('consultas')
}

