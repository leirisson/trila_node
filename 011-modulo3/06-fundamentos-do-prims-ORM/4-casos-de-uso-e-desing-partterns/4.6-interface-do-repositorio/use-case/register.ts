import { hash } from "bcryptjs"
import { prisma } from "lib/prisma"
import { usersRepository } from "repositories/users-repository"



interface RegisterInterfaceUseCase {
    name: string,
    email: string,
    password: string
}



export class RegisterUseCase {
    
    constructor(private usersRepository: usersRepository){}

    async execute({ name, email, password }: RegisterInterfaceUseCase) {
        const password_hash = await hash(password, 6)

        const emailEmUso = await this.usersRepository.findByEmail(email)

        if (emailEmUso) {
            throw new Error('Este e-mail já está em uso.')
        }

        
        await this.usersRepository.create(
            {
                name,
                email,
                password_hash,
            }
        )

    }
}

