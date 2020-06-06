const express = require('express');
import { Request, Response, NextFunction } from 'express';
//import {Request} from 'passport';
const router = require('../../lib/router');
const db = require('./model');

router.post('/register', function(req: Request, res: Response) {
  console.log('called register');
  db.validateRegister(req, res);
});

//used for checkin if user authenticated
router.get('/login', function(req: Request, res: Response) {
  if (req.session.userId) {
    res.status(301).json({ redirect: '/notes' });
  } else res.status(200).json('Not logged in');
});

router.post('/logout', function(req: any, res: Response) {
  req.session.destroy((err: any) => console.log(err));
  req.logout();
  res.status(301).json({ redirect: '/login' });
});

router.get('/register', function(req: Request, res: Response) {
  res.redirect('/');
});

module.exports = router;
