import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "lib/prisma"
import { registerUseCase } from "use-case/register"
import { z } from "zod"



export async function registerController(request: FastifyRequest, reply: FastifyReply){

    const createBodyRequestSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8)
    })

    const {
        name, 
        email,
        password
    } = createBodyRequestSchema.parse(request.body)

  try {
    await registerUseCase({name, email, password})
  } catch (error) {
    return reply.status(409).send()
  }

    return reply.status(201).send()
}