import fastify from "fastify";
import { registerController } from "http/controllers/registerController";
import { appRoutes } from "http/routes";


export const app = fastify()

app.register(appRoutes)