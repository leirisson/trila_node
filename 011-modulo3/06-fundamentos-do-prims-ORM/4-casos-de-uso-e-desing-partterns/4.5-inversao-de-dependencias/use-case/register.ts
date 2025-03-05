import { hash } from "bcryptjs"
import { prisma } from "lib/prisma"

interface RegisterUseCase {
    name: string,
    email: string,
    password: string,
}

export async function registerUseCase({
    name,
    email,
    password }: RegisterUseCase) {
    const passsword_hash = await hash(password, 6)

    const emailEmUso = await prisma.user.findUnique(
        {
            where: {
                email,
            }
        }
    )

    if (emailEmUso) {
        throw new Error('Erro o e-mail já esta em uso.')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            passsword_hash,
        }
    })
}