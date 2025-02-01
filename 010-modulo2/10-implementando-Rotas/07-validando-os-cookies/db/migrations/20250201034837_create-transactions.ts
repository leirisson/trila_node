import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transacoes', (tabela) => {
    tabela.uuid('id').primary()
    tabela.text('title').notNullable()
    tabela.decimal('amount',10,2).notNullable()
    tabela.text('description').notNullable()
    tabela.timestamp('created_at').defaultTo(knex.fn.now())
    tabela.uuid('sessionId').after('id').index()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transacoes')
}
