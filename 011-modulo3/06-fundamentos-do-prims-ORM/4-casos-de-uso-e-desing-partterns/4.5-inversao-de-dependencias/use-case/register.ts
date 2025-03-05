import { hash } from "bcryptjs"
import { prisma } from "lib/prisma"
import { PrismaUserRepository } from "repository/prisma-users-repository"

interface RegisterInterfaceUseCase {
    name: string,
    email: string,
    password: string,
}




export class RegisterUseCase {
    constructor( private usersRepository: any){}

    async execute({
        name,
        email,
        password }: RegisterInterfaceUseCase) {
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
    
        
    
        await this.usersRepository.create({
                name,
                email,
                passsword_hash,
        })
    }
}

