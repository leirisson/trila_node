import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { hash } from "bcryptjs"
import { registerUseCase } from "../../use-case/registerUseCase"


export async function registerController(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const { name, email, password } = createBodySchema.parse(request.body)

    try {
        registerUseCase({name, email, password})
    } catch (error) {
        return reply.status(409).send()
    }
    return reply.status(201).send()
}