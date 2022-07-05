import { Request, Response, NextFunction } from 'express'

export const getNotes = async (req: Request, response: Response) => {
  const userId = req.session.userId
  const client = await req.app.get('db').connect()
  client.query(
    'SELECT * FROM notes WHERE user_id = $1 ORDER BY id ASC',
    [userId],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).json({ notes: results.rows })
    }
  )
  client.release()
}

export const addNote = async (req: Request, response: Response) => {
  const { note, date, info } = req.body
  const userId = req.session.userId
  const client = await req.app.get('db').connect()
  client.query(
    `INSERT INTO notes (note, date, info, user_id) VALUES ($1, $2, $3, $4)`,
    [note, date, info, userId],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(201).json(true)
    }
  )
  client.release()
}

export const updateNote = async (req: Request, response: Response) => {
  const id = parseInt(req.params.id) //note's id
  const { note, date, info } = req.body
  const userId = req.session.userId
  const client = await req.app.get('db').connect()
  client.query(
    'UPDATE notes SET note = $1, date = $2, info = $3, user_id = $4 WHERE id = $5',
    [note, date, info, userId, id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Note edited, ID: ${id}`)
    }
  )
  client.release()
}

export const deleteNote = async (req: Request, response: Response) => {
  const id = parseInt(req.params.id)
  const client = await req.app.get('db').connect()
  client.query(
    'DELETE FROM notes WHERE id = $1',
    [id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Note deleted, ID: ${id}`)
    }
  )
  client.release()
}
