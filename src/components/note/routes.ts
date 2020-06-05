const express = require('express');
import { Request, Response, NextFunction } from 'express';
const router = require('../../lib/router');
import * as db from './model';
import { NetConnectOpts } from 'net';

function isProtected(req: Request, res: Response, next: NextFunction) {
  console.log('user idddddd in notea', req.session.userId);
  if (!req.session.userId) {
    return next(res.status(401).json({ redirect: '/login' }));
  } else return next();
}

router.get('/notes', isProtected, function(req: Request, res: Response) {
  db.getNotes(req, res);
});

router.delete('/notes/:id(\\d+)', isProtected, function(
  req: Request,
  res: Response
) {
  db.deleteNote(req, res);
});

router.post('/notes', isProtected, function(req: Request, res: Response) {
  db.addNote(req, res);
});

router.put('/notes/:id(\\d+)', isProtected, function(
  req: Request,
  res: Response
) {
  db.updateNote(req, res);
});

module.exports = router;
