require('dotenv').config()
import { Request, Response, NextFunction } from 'express'
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const redis = require('redis')
const redisStore = require('connect-redis')(session)
const secret = require('./lib/credentials/secret')
const noteRoutes = require('./components/note/routes')
const authRoutes = require('./components/auth/routes')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authDb = require('./components/auth/model')
const { Pool } = require('pg')

const server = express()
const client = redis.createClient(process.env.REDIS_URL)
server.use(
  cors({
    origin: true,
    credentials: true,
  })
)
server.use(bodyParser())

server.use((req: Request, res: Response, next: Function) => {
  initiateHeader(res)
  next()
})
server.use(express.static(path.join(__dirname + '/frontend')))
server.use(express.urlencoded())
server.use(express.json())
server.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
    store: new redisStore({ client }),
    cookie: {
      //secure: process.env.ENV == 'prod', TODO: has to support https
      httpOnly: true,
    },
  })
)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 20000,
})
server.set('db', pool)

server.use(passport.initialize())
server.use(passport.session())

passport.serializeUser(function(user: any, done: any) {
  done(null, user.id)
})
passport.deserializeUser(function(id: any, done: any) {})
passport.use(
  new LocalStrategy(function(
    username: String,
    password: String,
    done: Function
  ) {
    username = username.trim()
    if (username && password) {
      authDb.validateLogin(username, password, done, server.get('db'))
    } else {
      done(null, false, { message: 'Invalid username or password' })
    }
  })
)

server.use(noteRoutes)
server.use(authRoutes)

function initiateHeader(res: Response) {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  })
  return res
}

const port = process.env.PORT || 3000
server.listen(port, function() {
  console.log(`Listening on ${port}!`)
})
