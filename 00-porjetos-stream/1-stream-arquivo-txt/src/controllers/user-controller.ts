import { Request, Response } from "express"


export class UserController {


    async getUsuarios(request: Request, response: Response) {
        try {
            response.json({ msg: "funcionando" })
        } catch (error: any) {
            console.log(error.message)
        }
    }
}

