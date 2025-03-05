import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { hash } from "bcryptjs"


export async function registerController(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const { name, email, password } = createBodySchema.parse(request.body)

    const password_hash = await hash(password, 6)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })

    return reply.status(201).send()
}