import { Router } from "express"
import { userRoutes } from "./user-routes"
import { uploadRoutes } from "./upload-text"


export const routes = Router()

routes.use("/users",userRoutes)
routes.use("/upload", uploadRoutes)