import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";



export class PrismaUserRepository {
    async create (data: Prisma.UserCreateInput) {
        await prisma.user.create({
                data
            })
    }
}