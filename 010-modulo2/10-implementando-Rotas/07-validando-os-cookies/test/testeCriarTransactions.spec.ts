import { it, expect, beforeAll, afterAll, describe } from 'vitest';

import request from 'supertest'
import {app} from '../src/app'

describe('rotas de transações', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })
  
  // deve ser possivel criar uma nova transação
  it('should be able to create a new transaction', async () => {
    await request(app.server)
    .post('/api/v1/transactions/create')
    .send({
      title:"nova transação",
      amount: 1500,
      description:'teste',
      type: 'credit'
    })
    .expect(201)
  })

  it('should be able to list all transactions', async () => {

    const createTransactionResponse = await request(app.server)
    .post('/api/v1/transactions/create')
    .send({
      title:"nova transação",
      amount: 1500,
      description:'teste',
      type: 'credit'
    })
    
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse =  await request(app.server)
    .get('/api/v1/transactions/all')
    .set('Cookie', cookies)
    .expect(200)

    expect(listTransactionsResponse.body.allTansactions).toEqual(
      [
        expect.objectContaining({
          title:"nova transação",
          amount: 1500,
          description:'teste',
        })
      ]
    )
  })

})

