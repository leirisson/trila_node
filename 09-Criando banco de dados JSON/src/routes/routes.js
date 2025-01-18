import { Database } from '../db/database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from '../utils/build-route-path.js'


const database = new Database()

export const routes  = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handle: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
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
  },
  {
    metod:'DELETE',
    path: buildRoutePath('/users/:id'),
    handle:(req,res)=>{
      const {id} = req.params
      console.log(id)
      return res.end()
    }
  }
]
