import { Request, Response, NextFunction } from 'express';
const pool = require('../../lib/pool');

export const getNotes = (req: Request, response: Response) => {
  const userId = req.session.userId;
  pool.query(
    'SELECT * FROM notes WHERE user_id = $1 ORDER BY id ASC',
    [userId],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      //return results;
      response.status(200).json({ notes: results.rows });
    }
  );
};

export const addNote = (req: Request, response: Response) => {
  const { note, date, info } = req.body;
  const userId = req.session.userId;
  pool.query(
    `INSERT INTO notes (note, date, info, user_id) VALUES ($1, $2, $3, $4)`,
    [note, date, info, userId],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(201).json(true);
    }
  );
};

export const updateNote = (req: Request, response: Response) => {
  const id = parseInt(req.params.id); //note's id
  const { note, date, info } = req.body;
  const userId = req.session.userId;
  pool.query(
    'UPDATE notes SET note = $1, date = $2, info = $3, user_id = $4 WHERE id = $5',
    [note, date, info, userId, id],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Note edited, ID: ${id}`);
    }
  );
};

export const deleteNote = (req: Request, response: Response) => {
  const id = parseInt(req.params.id);
  pool.query(
    'DELETE FROM notes WHERE id = $1',
    [id],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Note deleted, ID: ${id}`);
    }
  );
};
