import { prisma } from "lib/prisma"
import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"



export async function register(request: FastifyRequest, reply: FastifyReply){
    const createRegisterBodySchema = z.object({
        nome : z.string(),
        idade: z.number(),
        cpf : z.string(),
        data_nascimento: z.string(),
        peso : z.number(),
        genero : z.string(),
        nacionalidade : z.string(),
        email : z.string()
    })

    const {
        nome,
        idade,
        cpf,
        data_nascimento,
        peso,
        genero,
        nacionalidade,
        email
    } = createRegisterBodySchema.parse(request.body)


    await prisma.pessoa.create({
        data:{
            nome,
            idade,
            cpf,
            data_nascimento,
            peso,
            genero,
            nacionalidade,
            email
        },
    })

    return reply.status(201).send()
}