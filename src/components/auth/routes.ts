import { NextFunction, Request, Response, Router } from 'express'
const passport = require('passport')
const router = require('../router')
const db = require('./model')

router.get('/register', function(req: Request, res: Response) {
  if (req.session.userId) {
    res.redirect('/notes')
  }
})

router.get('/login', function(req: Request, res: Response) {
  if (req.session.userId) {
    res.redirect('/notes')
  }
})

router.post('/api/v1/register', async function(req: Request, res: Response) {
  await db.validateRegister(req, res)
})

router.get('/api/v1/authenticated', function(req: Request, res: Response) {
  if (req.session.userId) {
    console.log("##### # ## # " + res)
    res.status(302).json({ redirect: '/notes' })
  } else res.status(200).json('Not logged in')
})

router.post('/api/v1/logout', function(req: any, res: Response) {
  req.session.destroy((err: any) => console.log(err))
  req.logout()
  res.status(302).json({ redirect: '/login' })
})

router.post('/api/v1/login', function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('local', function(e: Error, user: any, info: Object) {
    if (e) {
      console.log(e)
    }
    if (!user) {
      return res.status(401).json({ error: true, ...info })
    }
    req.session.userId = user.id
    return res.redirect('/notes')
  })(req, res, next)
})

module.exports = router
