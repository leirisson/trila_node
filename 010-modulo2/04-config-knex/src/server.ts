import fastify from 'fastify'
import { knex } from './databese'

const app = fastify()

app.get('/hello', async () => {
  const tabelas = await knex('sqlite_schema').select()
  return tabelas
})

app.listen({
  port: 3333
})
  .then(() => {
    console.log("run server")
  })