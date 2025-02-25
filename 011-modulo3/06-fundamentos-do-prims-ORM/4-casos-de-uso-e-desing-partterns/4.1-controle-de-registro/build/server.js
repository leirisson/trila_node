"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var createSchemaEnv = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3334)
});
var prev_env = createSchemaEnv.safeParse(process.env);
if (prev_env.success === false) {
  console.error("Xx => Erro nas variaveis de ambienete <=Xx ", prev_env.error.format());
  throw new Error("Erro nas variaveis de ambiente...");
}
var env = prev_env.data;

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  "log": env.NODE_ENV === "dev" ? ["query"] : []
});

// http/controllers/registerController.ts
var import_zod2 = require("zod");
async function register(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    name: import_zod2.z.string(),
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6)
  });
  const {
    name,
    email,
    password
  } = registerBodySchema.parse(request.body);
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password
    }
  });
  return reply.status(201).send();
}

// http/routes.ts
async function appRoutes(app2) {
  app2.post("/users", register);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(appRoutes);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log("Server is ruining...");
});
