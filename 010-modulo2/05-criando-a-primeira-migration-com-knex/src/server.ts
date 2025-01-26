import fastify from 'fastify'
import { knex } from './database'


const server = fastify()


server.get('/hello', async () => {
  const tabelas = await knex('sqlite_schema').select()
  return tabelas
})


server.listen({
  port: 3333,
})
  .then(() => {
    console.log("server runing...")
  })