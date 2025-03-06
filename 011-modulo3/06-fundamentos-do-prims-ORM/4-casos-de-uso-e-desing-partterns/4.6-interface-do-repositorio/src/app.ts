import { hash } from "bcryptjs";
import fastify from "fastify";
import { prisma } from "lib/prisma";
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

    const password_hash = await hash(password, 6)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

    return reply.status(201).send()
})