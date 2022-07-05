import { Request, Response, NextFunction } from 'express'
const bcrypt = require('bcrypt')

export const validateRegister = async (req: Request, res: Response) => {
  var { username, password, passwordRepeat } = req.body
  username = username ? username.trim() : username
  if (!(username && password && passwordRepeat)) {
    res
      .status(400)
      .json({ error: true, message: 'Please fill all required fields' })
  }
  if (password.length < 8) {
    res.status(400).json({
      error: true,
      message: 'Password has to be at least 8 characters long',
    })
  }
  if (password !== passwordRepeat) {
    res.status(400).json({ error: true, message: 'Passwords do not match' })
  }
  const client = await req.app.get('db').connect()
  try {
    await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
      (error: Error, results: any) => {
        console.log('after initiated query on register!')
        if (error) {
          console.log('#asd 2 2 2')
          throw error
        }
        if (results.rows.length > 0) {
          console.log('#asda sd asdasd')
          res
            .status(400)
            .json({ error: true, message: 'Username already taken' })
        } else {
          console.log('#asd asd asda')
          bcrypt.hash(password, 12, (err: Error, hash: String) => {
            client.query(
              `INSERT INTO users (username, password) VALUES ($1, $2)`,
              [username, hash],
              (error: Error, results: any) => {
                if (error) {
                  throw error
                }
                res
                  .status(200)
                  .json({ error: false, message: 'Register success' })
              }
            )
          })
        }
      }
    )
    client.release()
  } catch (e) {
    console.log(e)
  }
}

export const validateLogin = async (
  username: String,
  password: String,
  done: Function,
  db: any
) => {
  const client = await db.connect()
  client.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      if (results.rows && results.rows.length > 0) {
        const user = results.rows[0]
        bcrypt.compare(password, user.password, (err: Error, valid: any) => {
          if (valid) {
            done(null, user)
          } else {
            done(null, false, { message: 'Wrong password' })
          }
        })
      } else {
        done(null, false, { message: 'Incorrect username' })
      }
    }
  )
  client.release()
}

module.exports = { validateLogin, validateRegister }
