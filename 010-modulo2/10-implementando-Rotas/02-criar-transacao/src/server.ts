import fastify from 'fastify'
import { knex } from './database'
import { env } from '../env'

const app = fastify()

app.get('/', () => {
    const tabelas = knex('sqlite_schema').select()
    return tabelas
})



app.listen({
    port: env.PORT
})
.then(() => {
    console.log(`SERVER RUING => htto://localhost:${env.PORT}`)
})