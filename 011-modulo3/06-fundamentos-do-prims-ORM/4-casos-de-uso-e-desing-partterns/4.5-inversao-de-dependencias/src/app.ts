import fastify from "fastify";
import { prisma } from "lib/prisma";
import { z } from 'zod'
import {hash} from 'bcryptjs'


export const app = fastify()

app.post('/users', async (request, reply) => {
    const createBodySchemas = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })

    const { name, email, password } = createBodySchemas.parse(request.body)

    const passsword_hash = await hash(password, 6)

    await prisma.user.create({
        data: {
            name,
            email,
            passsword_hash,
        }
    })

    return reply.status(201).send()
})