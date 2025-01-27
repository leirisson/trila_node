import fastify from 'fastify';
import { knex } from './database'

const app = fastify()
const PORT = 3334

app.get('/api/v1/transacoes', async () => {
  const tabelas = await knex('sqlite_schema').select()
  return tabelas
})


app.listen({
  port: PORT
})
  .then(() => {
    console.log('API na rota:')
    console.log(`http://localhost:${PORT}/api/v1/transacoes`)
  })