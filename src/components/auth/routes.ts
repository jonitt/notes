const express = require('express');
import { Request, Response, NextFunction } from 'express';
const router = require('../../lib/router');
const db = require('./model');

function isSignedIn(req: Request, res: Response, next: NextFunction) {
  console.log('hwllo is called')
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
router.get('/login', isSignedIn, function(req: Request, res: Response) {
  /*if (req.session.loggedin) {
    res.status(301).json({ redirect: '/notes' });
  } else db.validateLogin(req, res);*/
  console.log('yay')
});

module.exports = router;
