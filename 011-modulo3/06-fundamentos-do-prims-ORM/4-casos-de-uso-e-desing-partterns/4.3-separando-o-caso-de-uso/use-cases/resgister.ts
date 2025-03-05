import { hash } from "bcryptjs"
import { prisma } from "lib/prisma"


interface RegisterUseCase {
    name: string
    email: string
    password: string
}

export async function registerUserCase({name, email, password}:RegisterUseCase) {


    const password_hash = await hash(password, 6)

    // verificando se o email já existe no banco de dados
    // aresposta do findUnique => retorna todos os dados do usuario se ja tiver sido cadastrado com esse email
    const emailExistente = await prisma.user.findUnique({
        where: {
            email,
        }
    })


    // verificando se o email ja existe 
    if (emailExistente) {
        throw new Error('Email já Existe')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })
}