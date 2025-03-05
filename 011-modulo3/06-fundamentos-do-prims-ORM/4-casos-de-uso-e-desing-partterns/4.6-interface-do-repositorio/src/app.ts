import fastify from "fastify";
import { z } from 'zod'

export const app = fastify()


app.post('/users', async (request, reply) => {

    const createBodyRequestSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const {
        name, 
        email,
        password
    } = createBodyRequestSchema.parse(request.body)

    
})