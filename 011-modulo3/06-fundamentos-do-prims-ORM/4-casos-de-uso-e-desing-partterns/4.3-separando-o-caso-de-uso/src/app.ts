import fastify from "fastify";
import { registerRoutes } from "http/routes";
export const app = fastify()

app.register(registerRoutes)