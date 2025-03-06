import { hash } from "bcryptjs"
import { prisma } from "lib/prisma"
import { PrismaUsersReository } from "repositories/prisma-user-repository"


interface RegisterInterfaceUseCase{
    name : string,
    email : string,
    password : string
}


export async function registerUseCase({name, email, password}: RegisterInterfaceUseCase){
       const password_hash = await hash(password, 6)

       const emailEmUso = await prisma.user.findUnique({
        where: {
            email
        }
       })

       if(emailEmUso){
        throw new Error('Este e-mail já está em uso.')
       }
    
      const prismaUsersReository = new   PrismaUsersReository()
      await prismaUsersReository.create({name, email, password_hash})

}