import { prisma } from "lib/prisma"
import { PrismaProductsRepository } from "repository/prisma-products-repository"

interface registerInterfaceProducts {
    name: string,
    price: number,
    category: string,
    onStock: number
}

export async function registerUseCase({ name, price, category, onStock }: registerInterfaceProducts) {
try {
    const prismaProductsRepository = new PrismaProductsRepository()

    await prismaProductsRepository.create({name, price, category, onStock})
} catch (error) {
    
}
} 

