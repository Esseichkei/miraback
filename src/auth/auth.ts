import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as localStrategy } from 'passport-local';
import { checkLogin } from '../db/mongo';

passport.use(
    'login',
    new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        async (email, password, done) => {
            const credentialsCheck = await checkLogin({email: email,
              password: password});
            if (credentialsCheck) {
                    done(null, {email: email, _id: 1},
                        {message: 'Logged in successfully!'});
            } else {
                done(null, false, {message: 'Incorrect credentials, email: ' + email + ' password: ' + password + '.'});
            }
        }
    )
);


passport.use(
    new JWTstrategy(
      {
        secretOrKey: String(process.env.PASSWORD),
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