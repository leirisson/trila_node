import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })

}