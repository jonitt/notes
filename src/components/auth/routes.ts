const express = require('express');
import { Request, Response, NextFunction } from 'express';
const router = require('../../lib/router');
const db = require('./model');

router.post('/login', function(req: Request, res: Response) {
  db.validateLogin(req, res);
});

router.post('/register', function(req: Request, res: Response) {
  db.validateRegister(req, res);
});

module.exports = router;
