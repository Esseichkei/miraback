import express from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {Strategy as JWTstrategy, ExtractJwt} from 'passport-jwt';
import { Strategy as localStrategy } from 'passport-local';

passport.use(
    'login',
    new localStrategy(
        (email, password, done) => {
            if (email === 'cat@catmail.com' &&
                password === 'meow') {
                    done(null, {email: email},
                        {message: 'Logged in successfully'});
            } else {
                done(null, false, {message: 'Incorrect credentials'});
            }
        }
    )
);

const authRouter = express.Router();
authRouter.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, '8aslkdfjeok');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
);
passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

export default authRouter;