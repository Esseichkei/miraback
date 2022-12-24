import express from 'express';
import roomRouter from './routes/rooms';
import authRouter from './auth/authRouter';
import bodyParser from 'body-parser';
import passport from 'passport';
const app = express();

require("./auth/auth");

app.use(bodyParser.urlencoded({extended: false}));

app.use(authRouter);

app.get('/', (req, res): void => {
    res.send('hello world, this is index');
});
app.use('/', passport.authenticate('jwt', { session: false }), roomRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500);
    res.json({ error: err });
  });

app.listen(3000);