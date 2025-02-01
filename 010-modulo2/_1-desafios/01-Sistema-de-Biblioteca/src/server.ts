import fastify from 'fastify'
import { env } from '../env'
import { bookRoutes } from '../routes/book';
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(bookRoutes, {
  prefix: '/api/v1/book'
})

app.listen({
  port: env.PORT
})
.then(() => {
  console.log('server runing')
})