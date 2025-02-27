import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "lib/prisma"
import { z } from "zod"
import { hash } from 'bcryptjs'


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const {
        name,
        email,
        password
    } = createBodySchema.parse(request.body)


    const password_hash = await hash(password, 6) // criando o hash da senha do usuriario

    const userWhithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if(userWhithSameEmail){
        return reply.status(409).send()
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

    return reply.status(201).send()
}