// wiki.js - Wiki route module.

var express = require('express');
import { Request, Response, NextFunction } from 'express';
var router = express.Router();
import * as db from './model';

// Home page that displays notes. Redirect to login if not signed in
router.get('/notes', function(req: Request, res: Response) {
  db.getNotes(req, res);
  //res.send('Homepage, where notes are displayed');
});

/*
// Home page that displays notes. Redirect to login if not signed in
router.get('/', function(req: Request, res: Response) {
  getNotes(req, res);
  //res.send('Homepage, where notes are displayed');
});
*/

/*

Notes:
- Get all notes (? allow lazy loading ?)
- Update certain note
- Add new note
- Delete note

Login:
- check username is free
- check password is good
- register
- login
*/
/*
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)*/
// About page route.
router.delete('/notes/:id(\\d+)', function(req: Request, res: Response) {
  db.deleteNote(req, res);
});

router.post('/notes', function(req: Request, res: Response) {
  db.addNote(req, res);
});

router.put('/notes/:id(\\d+)', function(req: Request, res: Response) {
  db.updateNote(req, res);
});

router.get('/login', function(req: Request, res: Response) {
  res.send('Login');
});

router.get('/register', function(req: Request, res: Response) {
  res.send('Register');
});

/*
{
    method: 'GET',
    path: '/note/{slug}',
    handler: (request, h) => {
      return 'This is a note';
    },
    config: {
      description: 'Gets the content of a note',
    },
  },
  {
    method: 'PUT',
    path: '/note/{slug}',
    handler: (request, h) => {
      return 'Edit a note';
    },
    config: {
      description: 'Updates the selected note',
    },
  },
  {
    method: 'DELETE',
    path: '/note/{slug}',
    handler: (request, h) => {
      return 'This note no longer exists';
    },
    config: {
      description: 'Deletes the selected note',
    },
  },
*/

module.exports = router;
