import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto'


const app = fastify()

const PORT = 3356


// inserindo dados
app.get('/registrar-transacao', async () => {
  const transacao = await knex('transacoes').insert({
    id: crypto.randomUUID(),
    title: "Deposito",
    amount: 260,
    session_id: crypto.randomUUID()
  })
  .returning('*')

  return transacao
})


// resgatando todos os dados
app.get('/todos-os-registros', async () => {
  const transacoes = await knex('transacoes')
  .select('*')

  return transacoes
})


// filtrando registro por valor usando wherer
app.get('/filtro', async () => {
  const transacoes = await knex('transacoes')
  .where('amount', 260)
  .select('*')

  return transacoes
})
app.listen({
  port: PORT
})
.then(() => {
  console.log('Servidor rodando:')
  console.log(`http://localhost:${PORT}`)
})