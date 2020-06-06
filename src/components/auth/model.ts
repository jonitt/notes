import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');
const pool = require('../../lib/pool');

export const validateRegister = (req: Request, res: Response) => {
  var { username, password, passwordRepeat } = req.body;
  username = username ? username.trim() : username;
  if (!(username && password && passwordRepeat)) {
    res
      .status(400)
      .json({ error: true, message: 'Please fill all required fields' });
  }
  if (password.length < 8) {
    res.status(400).json({
      error: true,
      message: 'Password has to be at least 8 characters long',
    });
  }
  if (password !== passwordRepeat) {
    res.status(400).json({ error: true, message: 'Passwords do not match' });
  }
  console.log('jsut before query register');
  pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    (error: Error, results: any) => {
      console.log('after initiated query on register!');
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        res
          .status(400)
          .json({ error: true, message: 'Username already taken' });
      } else {
        bcrypt.hash(password, 12, (err: Error, hash: String) => {
          pool.query(
            `INSERT INTO users (username, password) VALUES ($1, $2)`,
            [username, hash],
            (error: Error, results: any) => {
              if (error) {
                throw error;
              }
              res
                .status(200)
                .json({ error: false, message: 'Register success' });
            }
          );
        });
      }
    }
  );
};

export const validateLogin = (
  username: String,
  password: String,
  done: Function
) => {
  pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      if (results.rows && results.rows.length > 0) {
        const user = results.rows[0];
        bcrypt.compare(password, user.password, (err: Error, valid: any) => {
          if (valid) {
            done(null, user);
          } else {
            done(null, false, { message: 'Wrong password' });
          }
        });
      } else {
        done(null, false, { message: 'Incorrect username' });
      }
    }
  );
};

module.exports = { validateLogin, validateRegister };
