import fastify from 'fastify'
import { knex } from './database'
import { env } from '../env'

const app = fastify()

// app.register()
app.get('/', async () => {
  const tabela = knex('sqlite_schema').select()

  return tabela
})


app.listen({
  port: env.PORT
})
.then(() => {
  console.log("Servidor rodando...")
  console.log(`http://localhost:${env.PORT}`)
})