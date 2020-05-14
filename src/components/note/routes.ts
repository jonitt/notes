// wiki.js - Wiki route module.

var express = require('express');
import { Request, Response, NextFunction } from 'express';
var router = express.Router();

// Home page that displays notes. Redirect to login if not signed in
router.get('/', function(req: Request, res: Response) {
  res.send('Homepage, where notes are displayed');
});

// About page route.
router.get('/notes/:id(\\d+)', function(req: Request, res: Response) {
  res.send(`Note ${req.params.id}`);
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
