import { Request, Response, NextFunction } from 'express';
const pool = require('../../lib/pool');

export const validateLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username && password) {
    pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password],
      (error: Error, results: any) => {
        if (error) {
          throw error;
        }
        console.log(results.rows);
        console.log(username, password);
        if (results.rows.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          //res.redirect('/notes');
          res.status(200).json({ success: true });
        } else {
          res.status(401).send('Incorrect username or password');
        }

        //console.log(results);
        //return results;
      }
    );
  } else {
    res.status(401).send('Please enter password and username');
  }
};

module.exports = { validateLogin };
