import express from "express";
const userRouter = express.Router();
userRouter.get('/users', (req, res) => {
    res.send('GET request for Users -- READ');
});
userRouter.post('/users', (req, res) => {
    res.send('POST request for Users -- CREATE');
});
userRouter.put('/users', (req, res) => {
    res.send('PUT request for Users -- UPDATE');
});
userRouter.delete('/users', (req, res) => {
    res.send('DELETE request for Users -- DELETE');
});
export default userRouter;