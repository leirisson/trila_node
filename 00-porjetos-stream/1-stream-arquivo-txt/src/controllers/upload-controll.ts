import { Request, Response } from 'express'
import { processadorDeTexto } from '../utils/txtProcessor'
import path from 'path'

export class UploadController {
    async upload(request: Request, response: Response) {
        try {

            const file = request.file
            if (!file) {
                response.status(500).json({ msg: "Arquivo não informado" })
            }
            else {
                await processadorDeTexto(file.path)
                response.status(200).json({
                    message: "Importado com sucesso"
                })
            }



        } catch (error: any) {
            console.log(error.messge)
        }
    }
}