import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { PrismaRepository } from "../repositories/prisma-users-repositorys"

// criar uma interface 
interface RegisterInterfaceUseCase {
    name : string
    email : string
    password : string
}

export async function registerUseCase({ name, email, password }: RegisterInterfaceUseCase) {
    const password_hash = await hash(password, 6)

    const userEmail = await prisma.user.findUnique(
        {
            where: {
                email,
            }
        }
    )

    if (userEmail) {
        throw new Error('Email já está em uso')
    }

    const prismaUsersRepository = new PrismaRepository()
    await prismaUsersRepository.create({
        name,
        email,
        password_hash
    })
}