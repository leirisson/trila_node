import { Router } from "express"

//controller
import { UserController } from "../controllers/user-controller"

const userController = new UserController()
export const userRoutes = Router()

userRoutes.get('/', userController.getUsuarios)

