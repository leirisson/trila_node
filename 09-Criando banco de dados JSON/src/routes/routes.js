import { Database } from '../db/database.js'
import { randomUUID } from 'node:crypto'


const database = new Database()

export const routes  = [
  {
    method: 'GET',
    path: '/users',
    handle: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handle: (req, res) => {
      const {name, email} = req.body
      const user = {
        id: randomUUID(),
        name,
        email,
      }
      database.insert('users', user)

      return res.writeHead(201).end()
    }
  }
]
