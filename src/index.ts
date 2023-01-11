require("dotenv").config();
import express from 'express';
import secureRouter from './routes/secureRouter';
import authRouter from './auth/authRouter';
import passport from 'passport';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

require("./auth/auth");

app.use(authRouter);

app.get('/', (req, res): void => {
  res.send('hello world, this is index');
});

app.use('/', passport.authenticate('jwt', { session: false }), secureRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500);
    res.json({ error: err });
  });

app.listen(3001);