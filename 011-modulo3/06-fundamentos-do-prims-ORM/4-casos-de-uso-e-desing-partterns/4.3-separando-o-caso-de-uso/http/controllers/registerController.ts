import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUserCase } from 'use-cases/resgister'


export async function registerController(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    })

    const {
        name,
        email,
        password,
    } = registerBodySchema.parse(request.body)


    try {
        await registerUserCase({
            name,
            email,
            password
        })
    } catch (error) {

        return reply.status(409).send()

    }

    return reply.status(201).send()
}