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
  pool.query(
    'SELECT * FROM notes',
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      //console.log(results);
      //return results;
      response.status(200).json(results.rows);
      console.log(results)
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
