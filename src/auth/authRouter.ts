import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = express.Router(); // move out of this file
authRouter.post(
    '/login',
    async (req, res, next) => {
      console.log(req.body);
      passport.authenticate(
        'login',
        async (err, user, info) => {
            console.log(info.message);
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
                const token = jwt.sign({ user: body }, String(process.env.PASSWORD));
  
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

export default authRouter;