import type { Knex } from "knex";

// ID, número do processo, cliente, advogado responsável, status, data de abertura.
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('processos', (table) => {
        table.uuid('id').primary()
        table.text('numero_do_processo').notNullable()
        table.text('nome_cliente').notNullable()
        table.text('nomde_advogado').notNullable()
        table.text('status').notNullable()
        table.timestamp('data_de_abertura').defaultTo(knex.fn.now())
        table.uuid('session_id').after('id').index()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('processos')
}

