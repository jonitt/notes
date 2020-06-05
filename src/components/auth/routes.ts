const express = require('express');
import { Request, Response, NextFunction } from 'express';
const router = require('../../lib/router');
const db = require('./model');

function isSignedIn(req: Request, res: Response, next: NextFunction) {
  console.log('hwllo is called');
  if (req.session.userId) {
    return next(res.redirect('/notes'));
  } else return next();
}

/*
router.post('/login', function(req: Request, res: Response) {
  db.validateLogin(req, res);
});
*/
router.post('/register', isSignedIn, function(req: Request, res: Response) {
  db.validateRegister(req, res);
});

//used for checkin if user authenticated
router.get('/login', function(req: Request, res: Response) {
  console.log('get logins session ', req.session);
  if (req.session.userId) {
    res.status(301).json({ redirect: '/notes' });
  } else res.status(200).json('Not logged in');
});

module.exports = router;
