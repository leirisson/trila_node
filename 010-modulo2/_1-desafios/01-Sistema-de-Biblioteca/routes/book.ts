import type { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export function bookRoutes(app: FastifyInstance) {

  //  pegando todos os livros
  app.get('/all', async () => {
    const all_books = await knex('book').select()
    return { all_books }
  })

  //filtrando um livro por ID
  app.get('/one/:id', async (request, reply) => {
    const createSchemaRequestBody = z.object({
      id: z.string()
    })

    const { id } = createSchemaRequestBody.parse(request.params)

    const book = await knex('book')
      .where({ id }) // {id: id}
      .first()

    return reply.status(200).send({ book })

  })

  //filtro por autor

  //filtro po isbn

  // filtro por titulo

  app.post('/create', async (request, reply) => {
    const createSchemaBody = z.object({
      title: z.string(),
      autor: z.string(),
      isbn: z.string(),
      year_publication: z.string(),
      summary: z.string(),
    })

    const { title, autor, isbn, year_publication, summary } = createSchemaBody.parse(request.body)

    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 3 // vai expirar em 3 dias corridos
      })
    }

    await knex('book')
      .insert({
        id: randomUUID(),
        title,
        autor,
        isbn,
        year_publication,
        summary,
        session_id: sessionId
      })

    return reply.status(201).send()
  })


}