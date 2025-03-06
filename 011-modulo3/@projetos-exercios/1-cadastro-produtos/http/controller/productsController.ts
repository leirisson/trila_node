import {FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "lib/prisma"
import { registerUseCase } from "use-case/register"
import { z } from "zod"


export async function registerProduct(request: FastifyRequest, reply: FastifyReply){
    
    const createSchemaBodyRequest = z.object({
        name: z.string(),
        price: z.number(),
        category: z.string(),
        onStock : z.coerce.number().min(0)
    })

    const {
        name,
        price,
        category,
        onStock
    } = createSchemaBodyRequest.parse(request.body)

    try {
        await registerUseCase({name, price, category, onStock})
        
    } catch (error) {
        return reply.status(500).send()
    }

    return reply.status(201).send({menssage:'created'})
}