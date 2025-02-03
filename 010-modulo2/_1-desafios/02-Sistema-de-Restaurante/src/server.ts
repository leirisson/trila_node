import fastify from 'fastify'
import { env } from '../env'
import { pratosRoutes } from '../routes/pratos'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(pratosRoutes,{ 
    prefix: '/api/v1/pratos'
})


app.listen({
    port: env.PORT
})
.then(
    () => {
        console.log("server ruing...")
    }
)