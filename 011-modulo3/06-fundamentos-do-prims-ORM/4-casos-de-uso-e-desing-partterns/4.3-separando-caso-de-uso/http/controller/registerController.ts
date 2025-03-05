import { FastifyReply, FastifyRequest } from "fastify"
import {z} from 'zod'
import { prisma } from "../../lib/prismaConect"
import { hash } from "bcryptjs"


export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const password_hash = await hash(password, 6)


    const UsuarioComMesmoEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if(UsuarioComMesmoEmail){
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