import type { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { formatDate } from "../ultil/FormateDate";
import { checkSessionIdExist } from "../middlewares/checkSessionIDExists";



export function bookRoutes(app: FastifyInstance) {

  //  pegando todos os livros
  app.get('/all', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {

    const sessionId = request.cookies.sessionId


    const all_books = await knex('book')
      .where('session_id', sessionId)
      .select()
    return { all_books }
  })

  //filtrando um livro por ID
  app.get('/one/:id', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {


    const createSchemaRequestBody = z.object({
      id: z.string()
    })

    const { id } = createSchemaRequestBody.parse(request.params)
    const { sessionId } = request.cookies

    const book = await knex('book')
      .where(
        {
          'session_id': sessionId,
          'id': id
        }) // {id: id}
      .first()


    return reply.status(200).send({ book })

  })

  //filtro por autor
  app.get('/filter/autor', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {
    const createSchemaRequest = z.object({
      autor: z.string()
    })

    const { autor } = createSchemaRequest.parse(request.query)
    const { sessionId } = request.cookies

    const book = await knex('book')
      .where({
        'session_id': sessionId,
        'autor': autor
      })
      .returning('*')

    return reply.status(200).send({ book })


  })

  //filtro po isbn
  app.get('/filter/isbn', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {
    const createSchenaQueryParams = z.object({
      isbn: z.string()
    })

    const { isbn } = createSchenaQueryParams.parse(request.query)
    const { sessionId } = request.cookies

    const book = await knex('book')
      .where({
        'session_id': sessionId,
        'isbn': isbn
      })
      .returning('*')

    return reply.status(200).send({ book })

  })

  // filtro por titulo
  app.get('/filter/titulo', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {
    const createSchemaTitulo = z.object({
      titulo: z.string()
    })

    const { titulo } = createSchemaTitulo.parse(request.query)
    const { sessionId } = request.cookies


    const book = await knex('book')
      .where({
        'session_id': sessionId,
        'title': titulo
      })

    return { book }
  })

  // editando cadastro de um livro
  app.put('/edit/:id', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {

    const createSchemaBody = z.object({
      title: z.string(),
      autor: z.string(),
      isbn: z.string(),
      year_publication: z.string(),
      summary: z.string(),
    })

    const createSchemaID = z.object({
      id: z.string()
    })



    const { id } = createSchemaID.parse(request.params)
    const { title, autor, isbn, year_publication, summary } = createSchemaBody.parse(request.body)
    const { sessionId } = request.cookies

 


    const book = await knex('book')
      .where({
        'session_id': sessionId,
        'id': id
      })
      .update({
        title,
        autor,
        isbn,
        year_publication,
        summary,
        updated_at: formatDate(new Date())
      })
      .returning('*')


    return { book }


  })

  // deletando um livro
  app.delete('/delete/:id', {
    preHandler: [checkSessionIdExist],
  }, async (request, reply) => {
    const createSchemaID = z.object({
      id: z.string()
    })

    const { id } = createSchemaID.parse(request.params)
    const {sessionId} = request.cookies

    await knex('book')
      .where({
        'session_id':sessionId,
        'id':id})
      .delete()

    return reply.status(204).send()

  })

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

