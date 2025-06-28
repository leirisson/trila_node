import { prisma } from '../config/prisma'
import fs from 'fs'
import readLine from 'readline'


export async function processadorDeTexto(path: string) {

    const fileStream = fs.createReadStream(path)
    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (const line of rl){
        const [name, email] = line.split(',')
        if(name && email){
            await prisma.user.create({
                data: {
                    name:name.trim(),
                    email: email.trim()
                }
            })
        }
    }

    // apagar arquivo depois
    fs.unlinkSync(path)
}