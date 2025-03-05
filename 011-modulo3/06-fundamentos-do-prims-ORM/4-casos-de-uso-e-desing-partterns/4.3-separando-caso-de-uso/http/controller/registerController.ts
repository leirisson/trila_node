import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { registerUseCase } from "../../casos-de-uso/register"


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        await registerUseCase({ name, email, password })
    } catch (error) {
        return reply.status(409).send({ mensagem: error.message })
    }

    return reply.status(201).send()
}