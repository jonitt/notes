const express = require('express');
import { Request, Response, NextFunction } from 'express';
const router = require('../../lib/router');
import * as db from './model';

// Home page that displays notes. Redirect to login if not signed in
router.get('/notes', function(req: Request, res: Response) {
  db.getNotes(req, res);
  //res.send('Homepage, where notes are displayed');
});

router.delete('/notes/:id(\\d+)', function(req: Request, res: Response) {
  db.deleteNote(req, res);
});

router.post('/notes', function(req: Request, res: Response) {
  db.addNote(req, res);
});

router.put('/notes/:id(\\d+)', function(req: Request, res: Response) {
  db.updateNote(req, res);
});

router.get('/register', function(req: Request, res: Response) {
  res.send('Register');
});

module.exports = router;
