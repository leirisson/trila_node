import fastify from 'fastify';
import { knex } from './database'
import { env } from '../env';

const app = fastify()

// crinado banco
app.get('/', () => {
  const tabelas  = knex('sqlite_schema').select()
  return tabelas
})

//inserindo dados
app.get("/transactions", () => {
  return "oi"
})


app.listen({
  port: env.PORT
})
  .then(() => {
    console.log(`Server => http://localhost:${env.PORT}/transactions`);

  })