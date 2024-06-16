import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User, { Role } from '../../api/user/model'
import userRepository from '../../api/user/repository'

import configuration from '../../configuration'

interface TokenInput {
  required: boolean
  roles?: string[]
}

type Done = (error: any, user?: any) => void

const { jwtSecret, masterKey } = configuration

passport.use('master', new BearerStrategy((token: string, done: Function) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}));

passport.use('password', new BasicStrategy((username: string, password: string, done: Done) => {
  userRepository.findOne({ name: username }).then((user: User) => {
    if (!user) {
      done(true)
      return null
    }
    return user.authenticate(password).then((user: User | undefined) => {
      done(null, user)
      return null
    })
    .catch(done);
  })
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }: { id: string }, done: Function) => {
  userRepository.findById(id).then((user: User) => {
    done(null, user)
    return null
  }).catch(done)
}));

export const master = () => passport.authenticate('master', { session: false });

export const password = () => (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('password', { session: false }, (err: any, user: User, info: any) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next);

export const token = (data?: TokenInput) => (req: Request, res: Response, next: NextFunction) => {
  const required = data?.required ?? false
  const roles = data?.roles ?? Object.values(Role);

  return passport.authenticate('token', { session: false }, (err: any, user: User) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)
}
