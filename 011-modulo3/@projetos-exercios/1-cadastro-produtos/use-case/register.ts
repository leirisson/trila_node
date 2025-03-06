import { prisma } from "lib/prisma"

interface registerInterfaceProducts {
    name: string,
    price: number,
    category: string,
    onStock: number
}

export async function registerUseCase({ name, price, category, onStock }: registerInterfaceProducts) {

    await prisma.product.create({
        data : {
            name,
            price,
            category,
            onStock
        }
    })
} 