import express from 'express';
import roomRouter from './routes/rooms';
import authRouter from './auth/auth';
const app = express();

app.use(authRouter);

app.get('/', (req, res): void => {
    res.send('hello world, this is index');
});
app.use(roomRouter);

app.listen(3000);