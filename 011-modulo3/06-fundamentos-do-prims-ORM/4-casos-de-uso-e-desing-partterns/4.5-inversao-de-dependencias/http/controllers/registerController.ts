import { FastifyReply, FastifyRequest } from "fastify"
import { registerUseCase } from "use-case/register"
import { z } from "zod"



export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchemas = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    })

    const { name, email, password } = createBodySchemas.parse(request.body)

    try {
        await registerUseCase({ 
            name, 
            email, 
            password 
        })
    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}