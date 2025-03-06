
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUsersReository } from "repositories/prisma/prisma-user-repository"
import { RegisterUseCase } from "use-case/register"
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

    // ultilizando a  inversão de dependencia 
    // o repositorio deve depender do caso de uso
    // 1 - deve instaciar o Repositorio
    // 2 - passar o repositorio como parametro para o caso de uso

    const prismaUsersReository = new PrismaUsersReository()
    const registerUseCase = new RegisterUseCase(prismaUsersReository)


    await registerUseCase.execute({name, email, password})
  } catch (error) {
    return reply.status(409).send()
  }

    return reply.status(201).send()
}