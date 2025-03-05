import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "lib/prisma"
import { z } from "zod"



export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchemas = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })

    const { name, email, password } = createBodySchemas.parse(request.body)

    const passsword_hash = await hash(password, 6)

    const emailEmUso = await prisma.user.findUnique(
        {
            where: {
                email,
            }
        }
    )

    if(emailEmUso){
        return reply.status(409).send()
    }

    await prisma.user.create({
        data: {
            name,
            email,
            passsword_hash,
        }
    })

    return reply.status(201).send()
}