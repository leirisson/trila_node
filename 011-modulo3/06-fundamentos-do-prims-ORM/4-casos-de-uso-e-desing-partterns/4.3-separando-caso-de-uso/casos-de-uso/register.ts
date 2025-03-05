import { hash } from "bcryptjs"
import { prisma } from "../lib/prismaConect"

interface registerUseCaseRequest {
    name: string
    email: string
    password: string
}
export async function registerUseCase({name, email, password}: registerUseCaseRequest){
    const password_hash = await hash(password, 6)
    
    
        const UsuarioComMesmoEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        
    
        if(UsuarioComMesmoEmail){
            throw new Error('Este e-mail ja está em uso')
        }
    
        await prisma.user.create({
            data: {
                name,
                email,
                password_hash
            }
        })
}