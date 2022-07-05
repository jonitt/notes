import { Request, Response, NextFunction } from 'express'
import * as db from './model'
const router = require('../router')

router.get('/notes', function(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(302).json({ redirect: '/login' })
  }
})

function isProtected(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return next(res.status(302).json({ redirect: '/login' }))
  } else return next()
}

router.get('/api/v1/notes', isProtected, function(req: Request, res: Response) {
  db.getNotes(req, res)
})

router.delete('/api/v1/notes/:id(\\d+)', isProtected, function(
  req: Request,
  res: Response
) {
  db.deleteNote(req, res)
})

router.post('/api/v1/notes', isProtected, function(
  req: Request,
  res: Response
) {
  db.addNote(req, res)
})

router.put('/api/v1/notes/:id(\\d+)', isProtected, function(
  req: Request,
  res: Response
) {
  db.updateNote(req, res)
})

module.exports = router
