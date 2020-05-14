// wiki.js - Wiki route module.

var express = require('express');
import { Request, Response, NextFunction } from 'express';
var router = express.Router();

// Home page route.
router.get('/', function(req: Request, res: Response) {
  res.send('Wiki home page');
});

// About page route.
router.get('/note', function(req: Request, res: Response) {
  res.send('About this wiki');
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
