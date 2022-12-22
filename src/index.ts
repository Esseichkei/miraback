import express from 'express';
import roomRouter from './routes/rooms';
const app = express();

app.get('/', (req, res): void => {
    res.send('hello world, this is index');
});
app.use(roomRouter);

app.listen(3000);