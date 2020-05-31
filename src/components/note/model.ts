const cred = require('../../lib/credentials/user');
import { Request, Response, NextFunction } from 'express';
const Pool = require('pg').Pool;
const pool = new Pool({
  user: cred.username,
  host: 'localhost',
  database: cred.database,
  password: cred.password,
  port: 5432,
});

export const getNotes = (request: Request, response: Response) => {
  pool.query('SELECT * FROM notes ORDER BY id ASC', (error: Error, results: any) => {
    if (error) {
      throw error;
    }
    //console.log(results);
    //return results;
    response.status(200).json(results.rows);
  });
};

export const addNote = (request: Request, response: Response) => {
  const { note, date, info } = request.body;
  console.log(note, date, info)
  console.log('putting new noteeeee');
  pool.query(
    `INSERT INTO notes (note, date, info) VALUES ($1, $2, $3)`,
    [note, date, info],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      //console.log(results);
      //return results;
      response.status(200).json(true  );
    }
  );
};

export const updateNote = (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const { note, date, info } = request.body;

  pool.query(
    'UPDATE notes SET note = $1, date = $2, info = $3 WHERE id = $4',
    [note, date, info, id],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Note edited, ID: ${id}`);
    }
  );
};

export const deleteNote = (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

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

/*
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
*/
