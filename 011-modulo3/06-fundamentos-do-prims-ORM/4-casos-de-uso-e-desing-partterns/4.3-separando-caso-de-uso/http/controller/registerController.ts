import { FastifyReply, FastifyRequest } from "fastify"
import {z} from 'zod'
import { prisma } from "../../lib/prismaConect"


export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()
}