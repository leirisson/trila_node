import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";



class PrismaProductsRepository {

    async create (data: Prisma.ProductCreateInput){
       const product =  await prisma.product.create({
            data
        })

        return product
    }
}

