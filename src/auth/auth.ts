import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as localStrategy } from 'passport-local';

passport.use(
    'login',
    new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        (email, password, done) => {
            if (email === 'cat@catmail.com' &&
                password === 'meow') {
                    done(null, {email: email, _id: 1},
                        {message: 'Logged in successfully'});
            } else {
                done(null, false, {message: 'Incorrect credentials'});
            }
        }
    )
);


passport.use(
    new JWTstrategy(
      {
        secretOrKey: '8aslkdfjeok',
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