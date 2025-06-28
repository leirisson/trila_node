import { upload } from "../config/multer-config"
import { Router } from "express"

import { UploadController } from "../controllers/upload-controll"

const uploadController = new UploadController()

export const uploadRoutes = Router()


uploadRoutes.post('/', upload.single('file'), uploadController.upload)